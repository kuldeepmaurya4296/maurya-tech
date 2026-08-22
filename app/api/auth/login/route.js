import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { comparePassword, signToken } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { logSecurityEvent } from '@/lib/securityLogger';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_TIME_MS = 15 * 60 * 1000; // 15 minutes lock

export async function POST(req) {
  const clientIp = getClientIp(req);

  try {
    // 1. IP-based sliding window rate limiting
    const rateCheck = checkRateLimit(`login-${clientIp}`, 10, 5 * 60 * 1000);

    if (!rateCheck.isAllowed) {
      logSecurityEvent({
        eventType: 'LOGIN_RATE_LIMIT_EXCEEDED',
        ip: clientIp,
        endpoint: '/api/auth/login',
      });

      return NextResponse.json(
        {
          success: false,
          message: `Too many login attempts from this network. Please wait ${rateCheck.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      );
    }

    const { email, password, totpCode } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide both email and password.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim().slice(0, 100);
    const user = await User.findOne({ email: normalizedEmail }).select('+password +twoFactorSecret');

    if (!user) {
      logSecurityEvent({
        eventType: 'FAILED_LOGIN_UNKNOWN_USER',
        ip: clientIp,
        endpoint: '/api/auth/login',
        details: { attemptedEmail: normalizedEmail },
      });

      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 2. Enterprise Security: DB-backed Account Lockout Check
    if (user.lockUntil && user.lockUntil > new Date()) {
      const remainingMinutes = Math.ceil((user.lockUntil - new Date()) / (60 * 1000));
      logSecurityEvent({
        eventType: 'LOGIN_ATTEMPT_ON_LOCKED_ACCOUNT',
        ip: clientIp,
        endpoint: '/api/auth/login',
        details: { userId: user._id.toString() },
      });

      return NextResponse.json(
        {
          success: false,
          message: `Account is temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`,
        },
        { status: 423 } // Locked
      );
    }

    // 3. Verify Password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      // Increment failed attempts and trigger lockout if limit reached
      const newAttempts = (user.failedLoginAttempts || 0) + 1;
      const updateData = { failedLoginAttempts: newAttempts };

      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        updateData.lockUntil = new Date(Date.now() + LOCK_TIME_MS);
        logSecurityEvent({
          eventType: 'ACCOUNT_LOCKED_MAX_ATTEMPTS_REACHED',
          ip: clientIp,
          endpoint: '/api/auth/login',
          details: { userId: user._id.toString(), attempts: newAttempts },
        });
      }

      await User.findByIdAndUpdate(user._id, updateData);

      logSecurityEvent({
        eventType: 'FAILED_LOGIN_INVALID_PASSWORD',
        ip: clientIp,
        endpoint: '/api/auth/login',
        details: { userId: user._id.toString(), failedAttempts: newAttempts },
      });

      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // 4. Reset failed attempts on successful password verification
    if (user.failedLoginAttempts > 0 || user.lockUntil) {
      await User.findByIdAndUpdate(user._id, {
        failedLoginAttempts: 0,
        lockUntil: null,
      });
    }

    // 5. Generate Auth JWT Token
    const tokenPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const token = await signToken(tokenPayload);

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );

    // Set secure HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    logSecurityEvent({
      eventType: 'SUCCESSFUL_LOGIN',
      ip: clientIp,
      endpoint: '/api/auth/login',
      details: { userId: user._id.toString(), role: user.role },
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

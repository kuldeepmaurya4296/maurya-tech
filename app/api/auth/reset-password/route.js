import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import User from '@/lib/models/User';
import { hashPassword } from '@/lib/auth';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { logSecurityEvent } from '@/lib/securityLogger';

export async function POST(req) {
  const clientIp = getClientIp(req);

  try {
    const rateCheck = checkRateLimit(`reset-pw-${clientIp}`, 5, 10 * 60 * 1000);
    if (!rateCheck.isAllowed) {
      return NextResponse.json(
        { success: false, message: 'Too many attempts. Please wait before trying again.' },
        { status: 429 }
      );
    }

    const { token, newPassword, newSecurityPin } = await req.json();

    if (!token) {
      return NextResponse.json({ success: false, message: 'Invalid or missing reset token.' }, { status: 400 });
    }

    if (!newPassword && !newSecurityPin) {
      return NextResponse.json(
        { success: false, message: 'Please provide at least a new Password or a new 6-digit Security PIN.' },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Hash token to compare with database hash
    const hashedResetToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedResetToken,
      resetPasswordExpire: { $gt: new Date() },
    });

    if (!user) {
      logSecurityEvent({
        eventType: 'INVALID_OR_EXPIRED_RESET_TOKEN',
        ip: clientIp,
        endpoint: '/api/auth/reset-password',
      });

      return NextResponse.json(
        { success: false, message: 'The reset link is invalid or has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    // 1. Update Password if provided
    if (newPassword) {
      if (newPassword.length < 6) {
        return NextResponse.json(
          { success: false, message: 'New password must be at least 6 characters long.' },
          { status: 400 }
        );
      }
      user.password = await hashPassword(newPassword);
    }

    // 2. Update 6-digit Security PIN if provided
    if (newSecurityPin) {
      if (!/^\d{6}$/.test(newSecurityPin.trim())) {
        return NextResponse.json(
          { success: false, message: 'Security PIN must be exactly 6 numeric digits.' },
          { status: 400 }
        );
      }
      user.securityPin = await hashPassword(newSecurityPin.trim());
    }

    // 3. Clear reset token & unlock account
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    user.failedLoginAttempts = 0;
    user.lockUntil = null;

    await user.save();

    logSecurityEvent({
      eventType: 'PASSWORD_OR_PIN_RESET_SUCCESSFUL',
      ip: clientIp,
      endpoint: '/api/auth/reset-password',
      details: {
        userId: user._id.toString(),
        passwordUpdated: !!newPassword,
        securityPinUpdated: !!newSecurityPin,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your credentials have been securely updated. You can now sign in with your new password/PIN.',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reset password route error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

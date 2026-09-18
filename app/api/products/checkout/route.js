import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectToDatabase from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import { getProductBySku } from '@/data/digitalProducts';

export async function POST(request) {
  try {
    const body = await request.json();
    const { sku, email, name = '', phone = '', country = 'IN' } = body;

    if (!sku || !email) {
      return NextResponse.json(
        { error: 'Product SKU and customer email are required.' },
        { status: 400 }
      );
    }

    const product = getProductBySku(sku);
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    const countryKey = (country || 'IN').toUpperCase();
    const priceConfig = product.prices[countryKey] || product.prices.IN;
    const amountInSubunits = Math.round(priceConfig.amount * 100);

    await connectToDatabase();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    let razorpayOrderId = '';
    let isDemoMode = false;

    if (keyId && keySecret) {
      try {
        const auth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
        const res = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: amountInSubunits,
            currency: priceConfig.currency,
            receipt: `ord_${Date.now()}`,
            notes: {
              sku: product.sku,
              email,
              name,
            },
          }),
        });

        if (!res.ok) {
          const errorData = await res.json();
          console.error('Razorpay order creation error:', errorData);
          throw new Error(errorData.error?.description || 'Razorpay order creation failed');
        }

        const rzpOrder = await res.json();
        razorpayOrderId = rzpOrder.id;
      } catch (err) {
        console.error('Razorpay API error, falling back to simulated order:', err.message);
        isDemoMode = true;
        razorpayOrderId = `demo_order_${crypto.randomBytes(8).toString('hex')}`;
      }
    } else {
      isDemoMode = true;
      razorpayOrderId = `demo_order_${crypto.randomBytes(8).toString('hex')}`;
    }

    // Persist order in DB
    const order = await Order.create({
      orderId: razorpayOrderId,
      amount: priceConfig.amount,
      currency: priceConfig.currency,
      customerEmail: email,
      customerName: name,
      customerPhone: phone,
      productSku: product.sku,
      productTitle: product.title,
      status: 'created',
      country: countryKey,
      metadata: {
        isDemoMode,
        userAgent: request.headers.get('user-agent'),
      },
    });

    return NextResponse.json({
      success: true,
      orderId: razorpayOrderId,
      amount: amountInSubunits,
      currency: priceConfig.currency,
      keyId: isDemoMode ? 'rzp_test_demo' : keyId,
      isDemoMode,
      product: {
        sku: product.sku,
        title: product.title,
        displayPrice: priceConfig.display,
      },
    });
  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error during checkout.' },
      { status: 500 }
    );
  }
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const {
      userId,
      fullName,
      email,
      phone,
      paymentNetwork,
      transactionRef,
      amount = 200000,
      currency = 'UGX'
    } = req.body || {};

    if (!userId || !transactionRef) {
      return res.status(400).json({
        error: 'User ID and transaction reference are required.'
      });
    }

    const result = await sql`
      INSERT INTO evie_payments (
        user_id,
        full_name,
        email,
        phone,
        payment_network,
        transaction_ref,
        amount,
        currency,
        status
      )
      VALUES (
        ${userId},
        ${fullName || ''},
        ${email || ''},
        ${phone || ''},
        ${paymentNetwork || ''},
        ${transactionRef},
        ${amount},
        ${currency},
        'pending_activation'
      )
      RETURNING *
    `;

    return res.status(201).json({
      success: true,
      payment: result[0]
    });

  } catch (error: any) {
    console.error('EVIE payment submit error:', error);

    return res.status(500).json({
      error: error?.message || 'Server error'
    });
  }
}

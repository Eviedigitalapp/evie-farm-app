import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

function isAuthorized(req: any) {
  const auth = req.headers.authorization || '';
  const expected = `Bearer ${process.env.EVIE_ADMIN_API_KEY}`;

  return Boolean(
    process.env.EVIE_ADMIN_API_KEY &&
    auth === expected
  );
}

function addOneYear(date: Date) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + 1);
  return result;
}

export default async function handler(req: any, res: any) {
  try {
    if (!isAuthorized(req)) {
      return res.status(401).json({
        error: 'Unauthorized'
      });
    }

    if (req.method === 'GET') {
      const payments = await sql`
        SELECT *
        FROM evie_payments
        ORDER BY submitted_at DESC
      `;

      const licenses = await sql`
        SELECT *
        FROM evie_licenses
        ORDER BY activated_at DESC
      `;

      return res.status(200).json({
        success: true,
        payments,
        licenses
      });
    }

    if (req.method === 'POST') {
      const { action, paymentId } = req.body || {};

      if (!paymentId) {
        return res.status(400).json({
          error: 'Payment ID is required.'
        });
      }

      const paymentRows = await sql`
        SELECT *
        FROM evie_payments
        WHERE id = ${paymentId}
        LIMIT 1
      `;

      const payment = paymentRows[0];

      if (!payment) {
        return res.status(404).json({
          error: 'Payment not found.'
        });
      }

      const now = new Date();

      if (action === 'activate') {
        const endDate = addOneYear(now);

        await sql`
          INSERT INTO evie_licenses (
            user_id,
            full_name,
            email,
            phone,
            status,
            activated_at,
            access_end_date,
            last_payment_id
          )
          VALUES (
            ${payment.user_id},
            ${payment.full_name || ''},
            ${payment.email || ''},
            ${payment.phone || ''},
            'active',
            ${now.toISOString()},
            ${endDate.toISOString()},
            ${payment.id}
          )
          ON CONFLICT (user_id)
          DO UPDATE SET
            status = 'active',
            full_name = EXCLUDED.full_name,
            email = EXCLUDED.email,
            phone = EXCLUDED.phone,
            activated_at = EXCLUDED.activated_at,
            access_end_date = EXCLUDED.access_end_date,
            last_payment_id = EXCLUDED.last_payment_id
        `;

        await sql`
          UPDATE evie_payments
          SET
            status = 'activated',
            activated_at = ${now.toISOString()},
            access_end_date = ${endDate.toISOString()}
          WHERE id = ${payment.id}
        `;

        return res.status(200).json({
          success: true,
          status: 'activated',
          accessEndDate: endDate.toISOString()
        });
      }

      if (action === 'renew') {
        const licenseRows = await sql`
          SELECT *
          FROM evie_licenses
          WHERE user_id = ${payment.user_id}
          LIMIT 1
        `;

        const currentLicense = licenseRows[0];

        const currentEnd = currentLicense?.access_end_date
          ? new Date(currentLicense.access_end_date)
          : now;

        const renewalStart =
          currentEnd.getTime() > now.getTime()
            ? currentEnd
            : now;

        const newEndDate = addOneYear(renewalStart);

        await sql`
          INSERT INTO evie_licenses (
            user_id,
            full_name,
            email,
            phone,
            status,
            activated_at,
            access_end_date,
            renewed_at,
            last_payment_id
          )
          VALUES (
            ${payment.user_id},
            ${payment.full_name || ''},
            ${payment.email || ''},
            ${payment.phone || ''},
            'active',
            ${currentLicense?.activated_at || now.toISOString()},
            ${newEndDate.toISOString()},
            ${now.toISOString()},
            ${payment.id}
          )
          ON CONFLICT (user_id)
          DO UPDATE SET
            status = 'active',
            access_end_date = EXCLUDED.access_end_date,
            renewed_at = EXCLUDED.renewed_at,
            last_payment_id = EXCLUDED.last_payment_id
        `;

        await sql`
          UPDATE evie_payments
          SET
            status = 'renewed',
            renewed_at = ${now.toISOString()},
            access_end_date = ${newEndDate.toISOString()}
          WHERE id = ${payment.id}
        `;

        return res.status(200).json({
          success: true,
          status: 'renewed',
          accessEndDate: newEndDate.toISOString()
        });
      }

      return res.status(400).json({
        error: 'Invalid action.'
      });
    }

    res.setHeader('Allow', ['GET', 'POST']);

    return res.status(405).json({
      error: 'Method not allowed.'
    });
  } catch (error: any) {
    console.error('EVIE admin API error:', error);

    return res.status(500).json({
      error: 'Server error.',
      details: error?.message || 'Unknown error'
    });
  }
}

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: any, res: any) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);

    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const userId =
      typeof req.query.userId === 'string'
        ? req.query.userId.trim()
        : '';

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required.'
      });
    }

    const rows = await sql`
      SELECT *
      FROM evie_licenses
      WHERE user_id = ${userId}
      LIMIT 1
    `;

    const license = rows[0];

    if (!license) {
      return res.status(200).json({
        success: true,
        hasLicense: false,
        active: false,
        license: null
      });
    }

    const now = new Date();

    const accessEndDate =
      license.access_end_date
        ? new Date(license.access_end_date)
        : null;

    const active =
      license.status === 'active' &&
      Boolean(accessEndDate) &&
      accessEndDate!.getTime() > now.getTime();

    return res.status(200).json({
      success: true,
      hasLicense: true,
      active,
      license: {
        id: license.id,
        userId: license.user_id,
        fullName: license.full_name,
        email: license.email,
        phone: license.phone,
        status: license.status,
        activatedAt: license.activated_at,
        renewedAt: license.renewed_at,
        accessEndDate: license.access_end_date
      }
    });
  } catch (error: any) {
    console.error(
      'EVIE license API error:',
      error
    );

    return res.status(500).json({
      error: 'Server error.',
      details:
        error?.message || 'Unknown error'
    });
  }
}

import connect from '@/dbConfig/dbConfig';
import AnalyticsModel from '@/Models/analytics';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('inside backend');
  await connect();
  const body = await req.json();

  const { url, referrer, deviceType, ip } = body;

  try {
    const analyticsEntry = new AnalyticsModel({
      url,
      referrer,
      deviceType,
      ip,
    });
    await analyticsEntry.save();
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
}

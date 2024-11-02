import { startOfDay, endOfDay, format } from 'date-fns';
import { NextResponse } from 'next/server';
import connect from '@/dbConfig/dbConfig';
import AnalyticsModel from '@/Models/analytics';

export async function GET() {
  await connect();

  try {
    const today = new Date();

    // Total unique users by date
    const totalUsersByDate = await AnalyticsModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          uniqueUsers: { $addToSet: '$ip' }, // Track unique IPs for each day
        },
      },
      {
        $project: {
          date: '$_id',
          count: { $size: '$uniqueUsers' }, // Count unique IPs
        },
      },
      { $sort: { date: 1 } },
    ]);

    // Number of users today
    const usersToday = await AnalyticsModel.countDocuments({
      createdAt: { $gte: startOfDay(today), $lt: endOfDay(today) },
    });

    // Group by device type
    const deviceTypes = await AnalyticsModel.aggregate([
      { $group: { _id: '$deviceType', count: { $sum: 1 } } },
    ]);

    // Top routes by URL
    const topRoutes = await AnalyticsModel.aggregate([
      { $group: { _id: '$url', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);

    // Get recent log entries (limit to the last 20 entries)
    const logs = await AnalyticsModel.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    return NextResponse.json(
      {
        totalUsersByDate,
        usersToday,
        deviceTypes: deviceTypes.map((item) => ({
          device: item._id,
          count: item.count,
        })),
        topRoutes: topRoutes.map((item) => ({
          url: item._id,
          count: item.count,
        })),
        logs,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'Error fetching analytics data',
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}

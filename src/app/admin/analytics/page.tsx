'use client';

import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { format } from 'date-fns';
import { RefreshCcw } from 'lucide-react';

const COLORS = ['#8884d8', '#8dd1e1', '#a4de6c', '#d0ed57'];

export default function Analytics() {
  const [data, setData] = useState({
    totalUsersByDate: [],
    deviceTypes: [],
    topRoutes: [],
    logs: [],
  });

  const fetchAnalytics = async () => {
    const response = await axios.get('/api/getAnalyticsData');
    setData(response.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8 p-8">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <TotalUsersChart data={data.totalUsersByDate} />
        <DeviceTypesChart data={data.deviceTypes} />
      </div>

      <TopRoutesChart data={data.topRoutes} />

      <LogTable data={data.logs} onRefresh={fetchAnalytics} />
    </div>
  );
}

function TotalUsersChart({ data }: { data: any }) {
  return (
    <div className="h-96 w-full border p-6 pb-12 shadow">
      <h2 className="mb-4 text-xl font-semibold">Total Users Over Time</h2>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="2 2" stroke="#f3f3f3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="count" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function DeviceTypesChart({ data }: { data: any }) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Users by Device Type</h2>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="device"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((_: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
}

function TopRoutesChart({ data }: { data: any }) {
  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-semibold">Top Routes</h2>
      <BarChart
        layout="vertical"
        width={500}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="url" />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" background={{ fill: '#eee' }} />
      </BarChart>
    </div>
  );
}

function LogTable({ data, onRefresh }: { data: any; onRefresh: () => void }) {
  return (
    <div className="mt-8 overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-xl font-semibold">Log Entries</h2>
        <button onClick={onRefresh} className="text-blue-600">
          <RefreshCcw className="mr-2 inline-block" /> Refresh
        </button>
      </div>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">URL</th>
            <th className="border px-4 py-2">Referrer</th>
            <th className="border px-4 py-2">Device Type</th>
            <th className="border px-4 py-2">IP</th>
            <th className="border px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((log: any, index: number) => (
            <tr key={index}>
              <td className="border px-4 py-2">{log.url}</td>
              <td className="border px-4 py-2">{log.referrer}</td>
              <td className="border px-4 py-2">{log.deviceType}</td>
              <td className="border px-4 py-2">{log.ip}</td>
              <td className="border px-4 py-2">
                {format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

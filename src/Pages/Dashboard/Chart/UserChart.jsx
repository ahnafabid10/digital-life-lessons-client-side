import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {BarChart, Bar,XAxis, YAxis,Tooltip,CartesianGrid, ResponsiveContainer,} from 'recharts';

const UserChart = ({ userId }) => {
  const axiosSecure = useAxiosSecure();

  const { data = [] } = useQuery({
    queryKey: ['lesson-30-days', userId],
    enabled: !!userId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/aMonth/${userId}`);
      return res.data;
    },
  });

  const chartData = data.map(item => ({
    date: item._id,
    lessons: item.count,
  }));

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-purple-800 mb-5"> Lessons Created (Last 30 Days)
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="lessons" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserChart;

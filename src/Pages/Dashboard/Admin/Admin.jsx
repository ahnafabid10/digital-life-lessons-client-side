import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Legend, Pie, PieChart } from 'recharts';

const Admin = () => {
    const axiosSecure = useAxiosSecure()
    const {data: totalUsers=[]}= useQuery({
        queryKey: ["totalUsers"],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/users')
            console.log('tighitrgiut', res.data)
            return res.data
        }
        
    })
    const {data: totalPublicLessons=[]}= useQuery({
        queryKey: ["totalPubLess"],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/lessons')
            console.log('tighitrgiut', res.data)
            return res.data
        }
        
    })

    const {data: totalReportLessons=[]}= useQuery({
        queryKey: ["totalRepLess"],
        queryFn: async ()=>{
            const res = await axiosSecure.get('/reportLessons')
            console.log('tighitrgiut', res.data)
            return res.data
        }
        
    })
    // console.log(totalUsers)
    const pieData = [
  { name: "Users", value: totalUsers.length },
  { name: "Public Lessons", value: totalPublicLessons.length },
  { name: "Reported Lessons", value: totalReportLessons.length }
];
    
 const { data: todaysLessons = { count: 0 } } = useQuery({
    queryKey: ['todaysLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/today-count');
      return res.data;
    }
  });

  // top contributors
  const { data: topContributors = [] } = useQuery({
    queryKey: ['topContributors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/top-contributors');
      return res.data;
    }
  });

    return (
        <div className='w-8/10 mx-auto items-center justify-center'>
            <h2>Total users: {totalUsers.length}</h2>
            <h2>Total Public Lessons: {totalPublicLessons.length}</h2>
            <h2>Total Reported Lessons: {totalReportLessons.length}</h2>

            <h2 className='font-semibold'>Today's New Lessons</h2>
          <p className='text-xl'>{todaysLessons.count}</p>

<h2 className='font-semibold mb-2'>Most Active Contributors</h2>
        <ul className='list-disc pl-5'>
          {topContributors.map((user, idx) => (
            <li key={idx}>
            {user.email} - {user.lessonCount} lessons
            </li>
          ))}
        </ul>

            <div className='w-full h-[400px]'>
                <PieChart style={{ width: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 2 }} responsive>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={pieData}
        cx="50%"
        cy="100%"
        outerRadius="120%"
        fill="#8884d8"
        label
        isAnimationActive={true}
      />
      <Legend></Legend>
    </PieChart>
            </div>
        </div>
    );
};

export default Admin;
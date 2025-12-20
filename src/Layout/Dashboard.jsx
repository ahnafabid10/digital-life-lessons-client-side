import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../Hooks/useAuth';
import MyFavourite from '../Pages/Dashboard/MyFavourite/MyFavourite';

const Dashboard = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    console.log('koi theke asbe id', user?.email)
    const {data: userEmail =[]}= useQuery({
        queryKey: ['UserLessons'],
        enabled: !!user?.email,
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/?email=${user.email}`)
            console.log('asbe ki?????0', res.data)
            return res.data
        }
    })

      const dbUser = userEmail[0];

const { data: lessonsData} = useQuery({
    queryKey: ['user-lessons', dbUser?._id],
    enabled: !!dbUser?._id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${dbUser._id}/lessons`);
      console.log(lessonsData)
      return res.data;
    }
    
  });

//   const lessonAccess = lessonsData.lessons

//    const { data: favoriteLessons = [] } = useQuery({
//     queryKey: ['user-favorites', dbUser?._id],
//     enabled: !!dbUser?._id,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${dbUser._id}/favorites`);
//       console.log('dfsfdg', res.data)
//       return res.data;
//     },
//   });


    return (
        <div className="w-10/12 mx-auto my-10">
                 <div className="">
<p className="text-4xl text-purple-800 font-bold">
  Total Lessons Created: {lessonsData?.lessons?.length || 0}
</p>

<div className="grid grid-cols-1 md:grid-cols-2 my-10 gap-6 ">
  {lessonsData?.lessons?.map((l) => (
    <div
      key={l._id}
      className="p-4 border rounded-lg bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30 shadow hover:shadow-lg transition"
    >
      <h4 className="text-lg font-semibold">{l.title}</h4>
      <p className="text-gray-400 text-sm mb-2">{l.createAt}</p>
      <p>{l.description}</p>
    </div>
  ))}
      </div>
    </div>
        <MyFavourite></MyFavourite>

            
</div>
    );
};

export default Dashboard;
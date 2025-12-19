import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';

const LifeLessonDetails = () => {

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {_id} = useParams()
    console.log("show id", _id)

    const {data: lessonDetails, isLoading} = useQuery({
        queryKey:['lessonDetails', _id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/${_id}`)
            console.log('lesson details', res.data)
            return res.data;
        }
    })
    const {data: lessons} = useQuery({
        queryKey:['lessonDetails', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/?email=${user.email}`)
            console.log('lesson details', res.data)
            return res.data;
        }
    })

     if (isLoading) return <p>Loading...</p>;


    return (
        <div className="w-8/12 mx-auto min-h-screen my-10">
             <div >
    <h2 className="text-2xl font-bold mb-4">{lessonDetails?.title}</h2>
    <div className="flex items-center gap-3 mb-4">
      <img
        src={lessonDetails?.photo}
        className="w-10 h-10 rounded-full"
        alt=""/>
      <p>{lessonDetails?.name}</p>
    </div>

    <p className="text-gray-500 mb-2">Date: {lessonDetails?.createAt}</p>

    <p>{lessonDetails?.description}</p>

    <div className="mt-4 flex gap-2">
<span className="badge">{lessonDetails?.category}</span>
<span className="badge">{lessonDetails?.tone}</span>
<span className="badge badge-primary">{lessonDetails?.accessLevel}</span>
    </div>
  </div>
  <div className="flex items-center gap-4 p-4 mt-10 border rounded-lg bg-base-100 shadow">
      <img
        src={lessonDetails?.photo}
        alt={lessonDetails.name}
        className="w-16 h-16 rounded-full object-cover"
      />

      <div className="flex-1">
        <h3 className="text-lg font-semibold">{lessonDetails.name}</h3>
        <p className="text-sm text-gray-500">
          Total Lessons Created: {lessons.length}
        </p>
      </div>

      <Link to={`/profilePage/${lessonDetails.mongoUserId}`}>
        <button className="btn btn-outline btn-sm">View all lessons</button>
      </Link>
    </div>
        </div>
    );
};

export default LifeLessonDetails;
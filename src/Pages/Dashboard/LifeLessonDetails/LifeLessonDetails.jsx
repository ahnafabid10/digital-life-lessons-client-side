import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';
import { FaRegBookmark } from 'react-icons/fa';
import { MdOutlineReport } from "react-icons/md";
import LoadingPage from '../../LoadingPage/LoadingPage';
import Comment from '../Comment/Comment';



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


     if (isLoading) 
      return <LoadingPage></LoadingPage>;




    return (
        <div className="w-8/12 mx-auto min-h-screen my-10">
             <div >
              <div className='flex justify-between'>
                  <h2 className="text-2xl font-bold mb-4">{lessonDetails?.title}</h2>
                  <MdOutlineReport className='h-10 w-10'/>


              </div>

    <div className="flex items-center gap-3 mb-4">
      <img
        src={lessonDetails?.photo}
        className="w-10 h-10 rounded-full"
        alt=""/>
      <p>{lessonDetails?.name}</p>
    </div>

    <p className="text-gray-500 mb-2">Date: {lessonDetails?.createAt}</p>

        <div className="my-4 flex gap-2">
<span className="badge">{lessonDetails?.category}</span>
<span className="badge">{lessonDetails?.tone}</span>
<span className="badge badge-primary">{lessonDetails?.accessLevel}</span>
    </div>

    <p>{lessonDetails?.description}</p>

      <div className="my-4 flex gap-2">
<div>
  <button  className="btn">
  Like
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
</button>
</div>
   <p className='flex gap-2 btn items-center'>Favourite <FaRegBookmark /></p> 
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
    <div>
      <Comment></Comment>
    </div>
        </div>
    );
};

export default LifeLessonDetails;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useParams } from 'react-router';

const LifeLessonDetails = () => {

    const axiosSecure = useAxiosSecure()
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

     if (isLoading) return <p>Loading...</p>;


    return (
        <div>
             <div className="w-8/12 mx-auto min-h-screen my-10">
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
        </div>
    );
};

export default LifeLessonDetails;
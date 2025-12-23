import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { IoCheckboxOutline } from 'react-icons/io5';
import { MdFeaturedPlayList } from "react-icons/md";
import { FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApprovedLessons = () => {

    const axiosSecure = useAxiosSecure()
        const [category, setCategory] = useState('')
            const [privacy, setPrivacy] = useState('')



    const {data: lessons = [], refetch} = useQuery({
        queryKey: ['lessons'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/lessons`)
            return res.data
        }
    })
    const {data: publicLessons = [],} = useQuery({
        queryKey: ['publicLessons',],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/lessons/?privacy=Public`)
            return res.data
        }
    })
    const {data: privateLessons = [], } = useQuery({
        queryKey: ['privateLessons'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/lessons/?privacy=Private`)
            return res.data
        }
    })
    const {data: reportedLessons = []} = useQuery({
        queryKey: ['reportedLessons'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/reportLessons`)
            return res.data
        }
    })

    const updateLessonStatus = (lesson, status)=>{
        const updateInfo = {status: status, email: lesson.email}
        axiosSecure.put(`/lessons/${lesson._id}`, updateInfo)
        .then(res=>{
            if(res.data.modifiedCount){
                Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.isConfirmed) {
    refetch();
    Swal.fire({
      title: `${status}`,
      text: `Lesson status is set to ${status}.`,
      icon: "success"
    });
  }
});
            
            }
        })
    }

    const handleApprove = (lesson) => {
        updateLessonStatus(lesson, 'reviewed');
    }

    const handleRejection = (lesson) => {
        updateLessonStatus(lesson, 'featured');
    }

    const handleDelete = (id) => {
        axiosSecure.delete(`/lessons/${id}`)
        .then(res=>{
            if(res.data.deletedCount){
                                Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes!"
}).then((result) => {
  if (result.isConfirmed) {
    refetch();
    Swal.fire({
      title: `Deleted!`,
      text: `Lesson has been deleted.`,
      icon: "success"
    });
  }
});
            }
        })
    }

     const filter = lessons.filter(v => {
        const matchCategory = category ? v.category === category : true;
        const matchPrivacy = privacy ? v.privacy === "Private" : true;
        return matchCategory  &&  matchPrivacy;
    });

    return (
        <div className='w-9/12 mx-auto'>



            <h2 className="text-5xl mb-2">Lessons Pending Approval:{lessons.length}</h2>


            <h2 className='text-lg'>Public lessons: {publicLessons?.length}</h2>
            <h2  className='text-lg my-2'>Private Lessons: {privateLessons?.length}</h2>
            <h2  className='text-lg mb-2'>Reported Lessons: {reportedLessons?.length}</h2>

<div className='flex gap-5'>
                    <div className="dropdown dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1">Category </div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
<li><a onClick={() => setCategory("")}>All</a></li>
<li><a onClick={() => setCategory("Relationships")}>Relationships</a></li>
<li><a onClick={() => setCategory("Personal Growth")}>Personal Growth</a></li>
<li><a onClick={() => setCategory("Mistakes Learned")}>Mistakes Learned</a></li>
<li><a onClick={() => setCategory("Mindset")}>Mindset</a></li>
<li><a onClick={() => setCategory("Career")}>Career</a></li>
  </ul>

  
</div>
                    <div className="dropdown dropdown-center">
  <div tabIndex={0} role="button" className="btn m-1">Privacy</div>
  <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
<li><a onClick={() => setPrivacy("")}>All</a></li>
<li><a onClick={() => setPrivacy("Public")}>Public</a></li>
<li><a onClick={() => setPrivacy("Private")}>Private</a></li>
  </ul>

  
</div>
                </div>


            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Author Email</th>
        <th>Category</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {
        filter.map((lesson, index)=>
            <tr key={lesson._id}>
        <th>{index+1}</th>
        <td>{lesson.title}</td>
        <td>{lesson.email}</td>
        <td>{lesson.category}</td>
        <td>
            <p className={`${lesson.status ==='reviewed' ? 'text-green-800' : 'text-red-500'}`}>{lesson.status}</p>
            </td>
        <td className=''>
            <button onClick={()=>handleApprove(lesson)} className="btn">
                <IoCheckboxOutline />
            </button>
            <button onClick={()=>handleRejection(lesson)} className="btn mx-2">
                <MdFeaturedPlayList />
            </button>
            <button onClick={()=>handleDelete(lesson._id)} className="btn">
                <FaRegTrashCan />
            </button>
        </td>
      </tr>
        )
      }
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ApprovedLessons;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { IoCheckboxOutline } from 'react-icons/io5';
import { CiSquareRemove } from 'react-icons/ci';
import { FaRegTrashCan } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const ApprovedLessons = () => {

    const axiosSecure = useAxiosSecure()

    const {data: lessons = [], refetch} = useQuery({
        queryKey: ['lessons', 'pending'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/lessons`)
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

    return (
        <div>
            <h2 className="text-5xl">Lessons Pending Approval:{lessons.length}</h2>
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
        lessons.map((lesson, index)=>
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
                <CiSquareRemove />
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
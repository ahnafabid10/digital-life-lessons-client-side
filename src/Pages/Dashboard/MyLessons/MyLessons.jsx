import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyLessons = () => {
  

    const axiosSecure = useAxiosSecure();

    const {user} = useAuth()

    const { data: lessons= [], refetch} = useQuery({
        queryKey: ['myLessons', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
            return res.data
        }
    })

    const handleLessonDelete = id =>{
      console.log(id);
      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    axiosSecure.delete(`/lessons/${id}`)
    .then(res=> {
      console.log(res.data);

      if(res.data.deletedCount){
        //refresh data in ui 
        refetch();
        
      Swal.fire({
      title: "Deleted!",
      text: "Your lesson has been deleted.",
      icon: "success"
    });
      }
    })

    
  }
})
    }

    return (
        <div>
            <h2 className="text-5xl font-bold">My Lessons: {lessons.length}</h2>

            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Category</th>
        <th>Date</th>
        <th>Access Level</th>
        <th>Privacy</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {/* row 1 */}
      {
        lessons.map((lesson, index)=><tr key={lesson._id}>
          <th>{index + 1}</th>
          <td>{lesson.title}</td>
          <td>{lesson.category}</td>
          <td>{lesson.createAt}</td>
          <td>{lesson.accessLevel}</td>
          <td>{lesson.privacy}</td>
          
          <td>
            <Link to={`/dashboard/update-lesson/${lesson._id}`}><button className="btn hover:bg-[#Dab2ff] btn-square"><FaEdit /></button></Link>
        
            <button className="btn hover:bg-[#Dab2ff] btn-square mx-2"><FaMagnifyingGlass /></button>
            <button onClick={()=>handleLessonDelete(lesson._id)} className="btn hover:bg-[#Dab2ff] btn-square"><MdDelete /></button>
          </td>
          
        </tr>)
      }
    </tbody>
  </table>
</div>
        </div>
    );
};

export default MyLessons;
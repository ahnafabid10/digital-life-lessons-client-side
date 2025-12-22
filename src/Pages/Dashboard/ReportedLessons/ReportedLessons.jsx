import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaRegTrashCan } from 'react-icons/fa6';

const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reportedLessons = [], refetch} = useQuery({
        queryKey: ['reportedLessons'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/reportLessons`)
            return res.data
        }
    })

//     const { data: reports = [] } = useQuery({
//   queryKey: ['reportSummary'],
//   queryFn: async () => {
//     const res = await axiosSecure.get('/reportLessons/summary');
//     return res.data;
//   }
// });



  const handleDelete = (lessonId) => {
  Swal.fire({
    title: "Are you sure?",
    text: "This lesson will be permanently deleted!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      const res = await axiosSecure.delete(`/lessons/${lessonId}`);
      
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire("Deleted!", "Lesson has been removed.", "success");
      }
    }
  });
};


    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th>#</th>
        <th>Lesson title</th>
        <th>Report count</th>
        <th>Report Info</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
     
      {
        reportedLessons?.map((r, index)=>{
            return (<tr>
        <th>{index + 1}</th>
        <td>{r.lessonTitle}</td>
        <td>{reportedLessons.filter(
  item => item.lessonId === r.lessonId
).length}</td>
        <td>{/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById(`modal_${index}`).showModal()}>About Report</button>
<dialog id={`modal_${index}`} className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Reason</h3>
    
    <p className="py-4">Lesson ID: {r.lessonId}</p>
    <p className="py-4">Reporter Email: {r.reporterEmail}</p>
    <p className="py-4">Date & Time: {new Date(r.timestamp).toLocaleString()}</p>
    <p className="py-4">Reason: {r.reason}</p>
  </div>
</dialog></td>
        <td ><button onClick={() => handleDelete(r.lessonId)} className='btn'><FaRegTrashCan /></button>
</td>
      </tr>)
        })
      }
     
    </tbody>
  </table>
</div>
        </div>
    );
};

export default ReportedLessons;
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import { FaRegTrashCan } from "react-icons/fa6";

// import { FaRegTrashCan, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa6';

const ReportedLessons = () => {
    const axiosSecure = useAxiosSecure()
    const {data: reportedLessons = [], refetch} = useQuery({
        queryKey: ['reportedLessons'],
        queryFn: async ()=>{
            const res = await axiosSecure.get(`/reportLessons`)
            return res.data
        }
    })

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

    const closeModal = (index) => {
        document.getElementById(`modal_${index}`).close();
    };

    return (
        <div className="min-h-screen bg-base-200 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-error bg-opacity-10 rounded-xl flex items-center justify-center">
                            <FaExclamationTriangle className="text-2xl text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-base-content">Reported Lessons</h1>
                            <p className="text-base-content opacity-60 mt-1">Review and manage flagged content</p>
                        </div>
                    </div>
                    
                    {/* Stats Card */}
                    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-2xl shadow-lg mt-6">
                        <div className="flex items-center justify-between text-white">
                            <div>
                                <p className="text-sm opacity-90">Total Reports</p>
                                <p className="text-4xl font-bold mt-1">{reportedLessons.length}</p>
                            </div>
                            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <FaExclamationTriangle className="text-3xl text-red-800" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Table Section */}
                <div className="bg-base-100 rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead className="bg-base-200">
                                <tr>
                                    <th className="text-base-content font-semibold text-sm">#</th>
                                    <th className="text-base-content font-semibold text-sm">Lesson Title</th>
                                    <th className="text-base-content font-semibold text-sm">Reports</th>
                                    <th className="text-base-content font-semibold text-sm">Details</th>
                                    <th className="text-base-content font-semibold text-sm">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reportedLessons?.map((r, index) => {
                                    const reportCount = reportedLessons.filter(
                                        item => item.lessonId === r.lessonId
                                    ).length;
                                    
                                    return (
                                        <tr key={index} className="hover:bg-base-200 transition-colors duration-200">
                                            <th className="text-base-content opacity-70">
                                                <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center text-white font-semibold">
                                                    {index + 1}
                                                </div>
                                            </th>
                                            <td>
                                                <div className="font-medium text-base-content">{r.lessonTitle}</div>
                                            </td>
                                            <td>
                                                <div className={`badge ${reportCount > 5 ? 'badge-error' : reportCount > 2 ? 'badge-warning' : 'badge-info'} gap-2 font-semibold`}>
                                                    <FaExclamationTriangle className="text-xs" />
                                                    {reportCount}
                                                </div>
                                            </td>
                                            <td>
                                                <button 
                                                    className="btn btn-sm btn-ghost gap-2 hover:bg-primary hover:text-white transition-all duration-200"
                                                    onClick={() => document.getElementById(`modal_${index}`).showModal()}
                                                >
                                                    <FaInfoCircle />
                                                    View Report
                                                </button>
                                                
                                                <dialog id={`modal_${index}`} className="modal">
                                                    <div className="modal-box max-w-2xl bg-base-100">
                                                        <button 
                                                            className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3 hover:bg-error hover:text-white"
                                                            onClick={() => closeModal(index)}
                                                        >
                                                            ✕
                                                        </button>
                                                        
                                                        <div className="flex items-center gap-3 mb-6">
                                                            <div className="w-12 h-12 bg-error bg-opacity-10 rounded-xl flex items-center justify-center">
                                                                <FaExclamationTriangle className="text-2xl text-white" />
                                                            </div>
                                                            <h3 className="font-bold text-2xl text-base-content">Report Details</h3>
                                                        </div>
                                                        
                                                        <div className="space-y-4">
                                                            <div className="bg-base-200 p-4 rounded-xl">
                                                                <p className="text-sm text-base-content opacity-60 mb-1">Lesson ID</p>
                                                                <p className="font-mono text-base-content font-semibold">{r.lessonId}</p>
                                                            </div>
                                                            
                                                            <div className="bg-base-200 p-4 rounded-xl">
                                                                <p className="text-sm text-base-content opacity-60 mb-1">Reporter Email</p>
                                                                <p className="text-base-content font-medium">{r.reporterEmail}</p>
                                                            </div>
                                                            
                                                            <div className="bg-base-200 p-4 rounded-xl">
                                                                <p className="text-sm text-base-content opacity-60 mb-1">Date & Time</p>
                                                                <p className="text-base-content font-medium">{new Date(r.timestamp).toLocaleString()}</p>
                                                            </div>
                                                            
                                                            <div className="bg-error bg-opacity-5 p-4 rounded-xl border-l-4 border-error">
                                                                <p className="text-sm text-base-content text-white opacity-60 mb-2">Reason for Report</p>
                                                                <p className="text-base-content leading-relaxed">{r.reason}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="modal-backdrop" onClick={() => closeModal(index)}>
                                                    </div>
                                                </dialog>
                                            </td>
                                            <td>
                                                <button 
                                                    onClick={() => handleDelete(r.lessonId)} 
                                                    className="btn btn-sm btn-error gap-2 text-white hover:scale-105 transition-transform duration-200"
                                                >
                                                    <FaRegTrashCan />
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        
                        {reportedLessons.length === 0 && (
                            <div className="py-20 text-center">
                                <div className="w-20 h-20 bg-success bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FaInfoCircle className="text-4xl text-success" />
                                </div>
                                <h3 className="text-xl font-semibold text-base-content mb-2">No Reports Found</h3>
                                <p className="text-base-content opacity-60">All lessons are clear. Great job!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportedLessons;
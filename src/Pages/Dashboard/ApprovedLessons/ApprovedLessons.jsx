import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { IoCheckboxOutline } from 'react-icons/io5';
import { MdFeaturedPlayList } from "react-icons/md";
import { FaRegTrashCan, FaFilter } from 'react-icons/fa6';
import { BiSolidReport } from "react-icons/bi";
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
        const matchPrivacy = privacy ? v.privacy === privacy : true;
        return matchCategory && matchPrivacy;
    });

    return (
        <div className='min-h-screen bg-base-200 p-4 md:p-8'>
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-6">
                        Lessons Management
                    </h2>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-xl p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Total Lessons</p>
                                    <p className="text-3xl font-bold mt-1">{lessons.length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <IoCheckboxOutline className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-success to-success/80 text-white rounded-xl p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Public Lessons</p>
                                    <p className="text-3xl font-bold mt-1">{publicLessons?.length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <MdFeaturedPlayList className="text-3xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-warning to-warning/80 text-white rounded-xl p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Private Lessons</p>
                                    <p className="text-3xl font-bold mt-1">{privateLessons?.length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <FaRegTrashCan className="text-2xl" />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-error to-error/80 text-white rounded-xl p-5 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/80 text-sm font-medium">Reported</p>
                                    <p className="text-3xl font-bold mt-1">{reportedLessons?.length}</p>
                                </div>
                                <div className="bg-white/20 p-3 rounded-lg">
                                    <BiSolidReport className="text-3xl" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="bg-base-100 rounded-xl p-5 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <FaFilter className="text-primary text-xl" />
                            <h3 className="text-lg font-semibold text-base-content">Filters</h3>
                        </div>
                        <div className='flex flex-wrap gap-3'>
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-primary text-white gap-2">
                                    Category
                                    {category && <span className="badge badge-sm bg-white/20 border-0">{category}</span>}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow-xl border border-base-200 mt-2">
                                    <li><a onClick={() => setCategory("")} className="hover:bg-primary hover:text-white">All</a></li>
                                    <li><a onClick={() => setCategory("Relationships")} className="hover:bg-primary hover:text-white">Relationships</a></li>
                                    <li><a onClick={() => setCategory("Personal Growth")} className="hover:bg-primary hover:text-white">Personal Growth</a></li>
                                    <li><a onClick={() => setCategory("Mistakes Learned")} className="hover:bg-primary hover:text-white">Mistakes Learned</a></li>
                                    <li><a onClick={() => setCategory("Mindset")} className="hover:bg-primary hover:text-white">Mindset</a></li>
                                    <li><a onClick={() => setCategory("Career")} className="hover:bg-primary hover:text-white">Career</a></li>
                                </ul>
                            </div>
                            
                            <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-secondary text-white gap-2">
                                    Privacy
                                    {privacy && <span className="badge badge-sm bg-white/20 border-0">{privacy}</span>}
                                </div>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-lg z-[1] w-52 p-2 shadow-xl border border-base-200 mt-2">
                                    <li><a onClick={() => setPrivacy("")} className="hover:bg-secondary hover:text-white">All</a></li>
                                    <li><a onClick={() => setPrivacy("Public")} className="hover:bg-secondary hover:text-white">Public</a></li>
                                    <li><a onClick={() => setPrivacy("Private")} className="hover:bg-secondary hover:text-white">Private</a></li>
                                </ul>
                            </div>

                            {(category || privacy) && (
                                <button 
                                    onClick={() => {setCategory(''); setPrivacy('')}} 
                                    className="btn btn-ghost btn-sm text-error">
                                    Clear Filters
                                </button>
                            )}
                        </div>
                        <div className="text-sm text-base-content/60 mt-3">
                            Showing <span className="font-semibold text-primary">{filter.length}</span> of {lessons.length} lessons
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-base-100 rounded-xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead className="bg-base-200">
                                <tr>
                                    <th className="text-base-content font-bold">#</th>
                                    <th className="text-base-content font-bold">Title</th>
                                    <th className="text-base-content font-bold">Author Email</th>
                                    <th className="text-base-content font-bold">Category</th>
                                    <th className="text-base-content font-bold">Status</th>
                                    <th className="text-base-content font-bold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filter.length > 0 ? (
                                    filter.map((lesson, index) => (
                                        <tr key={lesson._id} className="hover:bg-base-200/50 transition-colors">
                                            <th className="text-base-content/70">{index + 1}</th>
                                            <td className="font-medium text-base-content">{lesson.title}</td>
                                            <td className="text-base-content/70">{lesson.email}</td>
                                            <td>
                                                <span className="badge badge-primary badge-sm">{lesson.category}</span>
                                            </td>
                                            <td>
                                                <span className={`badge badge-sm ${lesson.status === 'reviewed' ? 'badge-success' : 'badge-error'}`}>
                                                    {lesson.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="flex gap-2 justify-center">
                                                    <button 
                                                        onClick={() => handleApprove(lesson)} 
                                                        className="btn btn-sm btn-success text-white tooltip" 
                                                        data-tip="Approve">
                                                        <IoCheckboxOutline className="text-lg" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleRejection(lesson)} 
                                                        className="btn btn-sm btn-warning text-white tooltip" 
                                                        data-tip="Feature">
                                                        <MdFeaturedPlayList className="text-lg" />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(lesson._id)} 
                                                        className="btn btn-sm btn-error text-white tooltip" 
                                                        data-tip="Delete">
                                                        <FaRegTrashCan className="text-base" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-12">
                                            <div className="flex flex-col items-center gap-3">
                                                <FaFilter className="text-5xl text-base-content/20" />
                                                <p className="text-base-content/60 text-lg">No lessons match your filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApprovedLessons;
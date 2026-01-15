import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';
import { FaHeart, FaRegBookmark, FaRegHeart, FaClock, FaCalendarAlt } from 'react-icons/fa';
import { MdOutlineReport, MdUpdate } from "react-icons/md";
import LoadingPage from '../../LoadingPage/LoadingPage';
import Comment from '../Comment/Comment';
import { toast, ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon
} from "react-share";

const LifeLessonDetails = () => {
    const {
  register,
  handleSubmit,
  watch,
  reset
} = useForm();

const reason = watch("reason");

    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()
    const {_id} = useParams()

    const {data: lessonDetails, isLoading, refetch,} = useQuery({
        queryKey:['lessonDetails', _id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/${_id}`)
            return res.data;
        }
    })
    const {data: lessons} = useQuery({
        queryKey:['lesson', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/?email=${user.email}`)
            return res.data;
        }
    })

    // Similar by category
const { data: similarByCategory = [] } = useQuery({
  queryKey: ['similar-category', lessonDetails?.category],
  enabled: !!lessonDetails,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/lessons/similar/category?category=${lessonDetails.category}&lessonId=${_id}`
    );
    return res.data;
  }
});

const { data: similarByTone = [] } = useQuery({
  queryKey: ['similar-tone', lessonDetails?.tone],
  enabled: !!lessonDetails,
  queryFn: async () => {
    const res = await axiosSecure.get(
      `/lessons/similar/tone?tone=${lessonDetails.tone}&lessonId=${_id}`
    );
    return res.data;
  }
});

     const handleLike = async () => {
  if (!user) {
    toast.error('Please log in to like');
    return;
  }

  const res = await axiosSecure.patch(`/lessons/${_id}/like`, {
    userId: user.uid,
  });

  if (res.data.modifiedCount) {
    refetch();
  }
};

const handleFavorite = async () => {
  if (!user) {
    toast.error('Please log in to save');
    return;
  }

  await axiosSecure.patch(`/lessons/${_id}/favorite`, {
    userId: user.uid
  });

  await axiosSecure.post('/favourite',{
    lessonId: _id,
    Email: user.email,
  })

  refetch();
};

const handleReport = async (data) => {
  if (!user) {
    toast.error('Please log in to report');
    return;
  }

  await axiosSecure.post('/reportLessons', {
    lessonId: _id,
    lessonTitle:lessonDetails?.title ,
    reporterUserId: user.uid,
    reporterEmail: user.email,
    reason: data.reason,
  });

  Swal.fire({
  title: "Are you sure?",
   text: "Do you want to report this lesson?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, report it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Reported!",
      text: "The lesson has been reported successfully.",
      icon: "success"
    });
  }
});
  reset();
};

const shareUrl = window.location.href;
const shareTitle = lessonDetails?.title || "Check this lesson!";

if(isLoading) return (
            <div className='h-screen flex items-center justify-center text-center'>
                <span className="loading loading-infinity loading-xl" />
            </div>
        );

    return (
        <div className="w-full max-w-5xl mx-auto min-h-screen my-10 px-4">
             {/* Header Section with gradient background */}
             <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl p-8 mb-8 shadow-lg border border-base-300">
              <div className='flex justify-between items-start mb-6'>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent pr-4">
                    {lessonDetails?.title}
                  </h1>
                  
                  {/* Report Dropdown */}
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-error/10">
                      <MdOutlineReport className="w-6 h-6 text-error" />
                    </label>
                    <div
                      tabIndex={0}
                      className="dropdown-content bg-base-100 rounded-2xl z-10 w-72 p-5 shadow-xl border border-base-300"
                    >
                      <h3 className="font-semibold mb-3 text-lg">Report This Lesson</h3>
                      <select
                        className="select select-bordered w-full mb-3"
                        {...register("reason", { required: true })}
                      >
                        <option value="">Select report reason</option>
                        <option value="Inappropriate Content">Inappropriate Content</option>
                        <option value="Hate Speech or Harassment">Hate Speech or Harassment</option>
                        <option value="Misleading Information">Misleading Information</option>
                        <option value="Spam">Spam</option>
                        <option value="Sensitive Content">Sensitive Content</option>
                        <option value="Other">Other</option>
                      </select>

                      {reason && (
                        <button onClick={handleSubmit(handleReport)} className="btn btn-error text-white w-full">
                          Submit Report
                        </button>
                      )}
                    </div>
                  </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mb-6">
                <div className="avatar">
                  <div className="w-14 h-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={lessonDetails?.photo} alt={lessonDetails?.name} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold text-lg">{lessonDetails?.name}</p>
                  <p className="text-sm text-base-content/60">Life Lesson Author</p>
                </div>
              </div>

              {/* Date Info with Icons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-3 bg-base-100/50 backdrop-blur-sm rounded-xl p-4 border border-base-300/50">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FaCalendarAlt className="text-primary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-medium">Created On</p>
                    <p className="font-semibold">{lessonDetails?.createAt}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-base-100/50 backdrop-blur-sm rounded-xl p-4 border border-base-300/50">
                  <div className="bg-secondary/10 p-3 rounded-lg">
                    <MdUpdate className="text-secondary text-xl" />
                  </div>
                  <div>
                    <p className="text-xs text-base-content/60 font-medium">Last Updated</p>
                    <p className="font-semibold">{lessonDetails?.lastUpdate}</p>
                  </div>
                </div>
              </div>

              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="badge badge-lg badge-primary gap-2 px-4 py-3">
                  {lessonDetails?.category}
                </span>
                <span className="badge badge-lg badge-secondary gap-2 px-4 py-3">
                  {lessonDetails?.tone}
                </span>
                <span className="badge badge-lg badge-accent gap-2 px-4 py-3">
                  {lessonDetails?.accessLevel}
                </span>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-base leading-relaxed">{lessonDetails?.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <button onClick={handleLike} className="btn btn-outline gap-2 hover:btn-primary">
                  {lessonDetails?.likes?.includes(user?.uid)
                    ? <FaHeart className="text-red-500" />
                    : <FaRegHeart />
                  }
                  <span>Like</span>
                  <span className="badge badge-neutral">
                    {lessonDetails?.likes?.length || 0}
                  </span>
                </button>

                <button onClick={handleFavorite} className="btn btn-outline gap-2 hover:btn-secondary">
                  <FaRegBookmark />
                  <span>Save</span>
                  <span className="badge badge-neutral">
                    {lessonDetails?.favorites?.length || 0}
                  </span>
                </button>
              </div>

              {/* Share Buttons */}
              <div className="mt-6 pt-6 border-t border-base-300">
                <p className="text-sm font-medium mb-3 text-base-content/70">Share this lesson:</p>
                <div className="flex gap-3">
                  <FacebookShareButton url={shareUrl} quote={shareTitle}>
                    <FacebookIcon size={40} round />
                  </FacebookShareButton>

                  <TwitterShareButton url={shareUrl} title={shareTitle}>
                    <TwitterIcon size={40} round />
                  </TwitterShareButton>

                  <WhatsappShareButton url={shareUrl} title={shareTitle}>
                    <WhatsappIcon size={40} round />
                  </WhatsappShareButton>

                  <LinkedinShareButton url={shareUrl} title={shareTitle}>
                    <LinkedinIcon size={40} round />
                  </LinkedinShareButton>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 mb-8 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-6">
                <div className="avatar">
                  <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img src={lessonDetails?.photo} alt={lessonDetails?.name} />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">{lessonDetails?.name}</h3>
                  <p className="text-base-content/70 flex items-center gap-2">
                    <span className="badge badge-ghost">Total Lessons Created: {lessons?.length}</span>
                  </p>
                </div>

                <Link to={`/profilePage/${lessonDetails?.mongoUserId}`}>
                  <button className="btn btn-primary">View All Lessons</button>
                </Link>
              </div>
            </div>

            {/* Similar Lessons */}
            {similarByCategory.length > 0 && (
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Similar Lessons
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarByCategory.map(lesson => (
                    <div
                      key={lesson._id}
                      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:-translate-y-1"
                    >
                      <div className="card-body">
                        <h3 className="card-title line-clamp-2 text-lg">
                          {lesson.title}
                        </h3>

                        <div className="flex gap-2 my-2">
                          <span className="badge badge-outline badge-sm">{lesson.category}</span>
                          <span className="badge badge-outline badge-sm">{lesson.tone}</span>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <Link
                            to={`/lessonsDetails/${lesson._id}`}
                            className="btn btn-primary btn-sm w-full"
                          >
                            View Lesson
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Lessons */}
            {similarByTone.length > 0 && (
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                  Recommended For You
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {similarByTone.map(lesson => (
                    <div
                      key={lesson._id}
                      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:-translate-y-1"
                    >
                      <div className="card-body">
                        <h3 className="card-title line-clamp-2 text-lg">
                          {lesson.title}
                        </h3>

                        <div className="flex gap-2 my-2">
                          <span className="badge badge-outline badge-sm">{lesson.category}</span>
                          <span className="badge badge-outline badge-sm">{lesson.tone}</span>
                        </div>

                        <div className="card-actions justify-end mt-4">
                          <Link
                            to={`/lessonsDetails/${lesson._id}`}
                            className="btn btn-secondary btn-sm w-full"
                          >
                            View Lesson
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments Section */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-lg border border-base-300">
              <Comment />
            </div>

            <ToastContainer />
        </div>
    );
};

export default LifeLessonDetails;
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { Link, useParams } from 'react-router';
import { useAuth } from '../../../Hooks/useAuth';
import { FaHeart, FaRegBookmark, FaRegHeart } from 'react-icons/fa';
import { MdOutlineReport } from "react-icons/md";
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
    console.log("show id", _id)

    const {data: lessonDetails, isLoading, refetch} = useQuery({
        queryKey:['lessonDetails', _id],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/${_id}`)
            console.log('lesson details', res.data)
            return res.data;
        }
    })
    const {data: lessons} = useQuery({
        queryKey:['lesson', user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/lessons/?email=${user.email}`)
            console.log('lesson details', res.data)
            
            return res.data;
        }
    })

    console.log("hello lessons",lessons)



     if (isLoading) 
      return <LoadingPage></LoadingPage>;

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
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
  reset();
};


const shareUrl = window.location.href;
const shareTitle = lessonDetails?.title || "Check this lesson!";


    return (
        <div className="w-8/12 mx-auto min-h-screen my-10">
             <div >
              <div className='flex justify-between'>
                  <h2 className="text-2xl font-bold mb-4">{lessonDetails?.title}</h2>
<div className="dropdown dropdown-end">
  <label tabIndex={0} className="btn btn-ghost">
    <MdOutlineReport className="w-6 h-6" />
  </label>
  <form
    onSubmit={handleSubmit(handleReport)}
    tabIndex={0}
    className="dropdown-content bg-base-100 rounded-box z-10 w-64 p-4 shadow"
  >
    <select
      className="select select-bordered w-full"
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
      <button type="submit" className="bg-gradient-to-r from-primary to-secondary text-white border-t border-white border-opacity-30 btn my-2 text-center justify-center">Submit Report</button>
    )}
  </form>
</div>

                  
                  {/* <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="m-1"><MdOutlineReport className='h-10 w-10'/></div>
  <form action="">
<ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
    <select>
      <option>Select Your Option</option>
      <option>Inappropriate Content</option>
<option>Hate Speech or Harassment</option>
<option>Misleading Information</option>
<option>Spam</option>
<option>Sensitive Content</option>
<option>Other</option>

    </select>

  </ul>

  <button>Submit</button>
  </form>
  
</div> */}


              </div>

    <div className="flex items-center gap-3 mb-4">
      <img
        src={lessonDetails?.photo}
        className="w-10 h-10 rounded-full"
        alt=""/>
      <p>{lessonDetails?.name}</p>
    </div>

    <p className="text-gray-500 mb-2">Date: {lessonDetails?.createAt}</p>
    <p className="text-gray-500 mb-2">Last Update: {lessonDetails?.lastUpdate}</p>

        <div className="my-4 flex gap-2">
<span className="badge">{lessonDetails?.category}</span>
<span className="badge">{lessonDetails?.tone}</span>
<span className="badge badge-primary">{lessonDetails?.accessLevel}</span>
    </div>

    <p>{lessonDetails?.description}</p>

      <div className="my-4 flex gap-2">
<div>
  <button onClick={handleLike} className="btn btn-outline flex gap-2">
    {lessonDetails?.likes?.includes(user?.uid)
      ? <FaHeart className="text-red-500" />
      : <FaRegHeart />
    }
    <span>Like</span>
    <span className="badge badge-neutral">
      {lessonDetails?.likes?.length || 0}
    </span>
  </button>

</div>
   <button
    onClick={handleFavorite}
    className="btn btn-outline flex gap-2"
  >
    <FaRegBookmark />
    <span>Save</span>
    <span className="badge badge-neutral">
      {lessonDetails?.favorites?.length || 0}
    </span>
  </button>
    </div>

    <div>


    </div>

    <div className="flex gap-2 my-4">
  <FacebookShareButton url={shareUrl} quote={shareTitle}><FacebookIcon size={32} round />
  </FacebookShareButton>

  <TwitterShareButton url={shareUrl} title={shareTitle}><TwitterIcon size={32} round />
  </TwitterShareButton>

  <WhatsappShareButton url={shareUrl} title={shareTitle}><WhatsappIcon size={32} round />
  </WhatsappShareButton>

  <LinkedinShareButton url={shareUrl} title={shareTitle}><LinkedinIcon size={32} round />
  </LinkedinShareButton>
</div>

  </div>
  <div className="flex items-center gap-4 p-4 mt-10 border rounded-lg bg-base-100 shadow">
      <img
        src={lessonDetails?.photo}  alt={lessonDetails.name} className="w-16 h-16 rounded-full object-cover"/>

      <div className="flex-1">
  <h3 className="text-lg font-semibold">{lessonDetails.name}</h3>
    <p className="text-sm text-gray-500">Total Lessons Created: {lessons?.length}</p>
      </div>

      <Link to={`/profilePage/${lessonDetails.mongoUserId}`}>
        <button className="btn btn-outline btn-sm">View all lessons</button>
      </Link>
    </div>
    <div>
      <Comment></Comment>
    </div>
    <ToastContainer></ToastContainer>
        </div>
    );
};

export default LifeLessonDetails;
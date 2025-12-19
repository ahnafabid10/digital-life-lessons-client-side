import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useAuth } from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';
import LoadingPage from '../LoadingPage/LoadingPage';

const PublicLessons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: publicLessons = [], isLoading } = useQuery({
    queryKey: ['publicLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons?privacy=Public');
      console.log("publicLesson",res.data)
      return res.data;
    },
  });
  const { data: getUsers = [] } = useQuery({
    queryKey: ['userPlan', user?.email],
    queryFn: async () => {
      const resUsers = await axiosSecure.get(`/users/?email=${user.email}`);
      console.log("get user data", resUsers.data)
      return resUsers.data;
    },
  });

  if (isLoading) {
    return <LoadingPage></LoadingPage>
  }

  return (
    <div className='w-9/12 mx-auto my-10 min-h-screen'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {publicLessons.map(lesson => {
        const isPremiumLesson = lesson.accessLevel === 'Premium';
        const isPremiumUser = getUsers[0]?.isPremium === true

        return (
          <div className="card bg-base-100 shadow-md relative">
            {isPremiumLesson && !isPremiumUser && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/50 text-white rounded-lg">
                <FaLock className="text-3xl mb-2" />
                <Link to="/pricing" className="font-semibold">Premium Lesson – Upgrade to view</Link>
              </div>
            )}

            <div className="card-body">
      <h2 className="card-title text-primary">{lesson.title}</h2>

      {/*user info */}

  <div className="flex items-center gap-2 mb-2">
    <img
      src={lesson?.photo}
      alt=""
      className="w-8 h-8 rounded-full object-cover"
    />
    <p className="text-sm font-medium">{lesson?.name}</p>
  </div>
  <p>Date: {lesson?.createAt}</p>
      {/* user data */}
      {/* <p>{isPremiumUser.name}</p>
      <img src={isPremiumUser.photo} alt="" /> */}
<p className="text-sm text-gray-500">{lesson.description.slice(0, 100)}...</p>

              <div className="flex flex-wrap gap-2 text-xs mt-2">
<span className="badge badge-outline">{lesson.category}</span>
<span className="badge badge-outline">{lesson.tone}</span>
<span className={`badge ${isPremiumLesson ? 'badge-secondary' : 'badge-success'}`}>{lesson.accessLevel}</span>
              </div>



              <div className="card-actions justify-end mt-4">
            <Link to={`/lessonsDetails/${lesson._id}`}>
            <button disabled={isPremiumLesson && !isPremiumUser} className="btn btn-primary btn-sm">See Details</button></Link>
        </div>
            </div>
                </div>
        );
      })}
    </div>
    </div>
    
  );
};

export default PublicLessons;

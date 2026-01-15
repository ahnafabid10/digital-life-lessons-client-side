import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';
import LoadingPage from '../../LoadingPage/LoadingPage';
import { FaBookOpen, FaCalendarAlt, FaHeart } from 'react-icons/fa';
import { MdCategory } from 'react-icons/md';

const ProfilePage = () => {
  const axiosSecure = useAxiosSecure();
  const { _id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['profileDetails', _id],
    queryFn: async () => {
        const res = await axiosSecure.get(`/users/${_id}/lessons`);
        console.log('datadatadata', res.data)
      return res.data;
    }
  });

  if(isLoading) 
    return <LoadingPage></LoadingPage>

  const user = data?.user;
  const lessons = data?.lessons;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300">
      {/* Hero Section with Profile */}
      <div className="bg-gradient-to-r from-primary via-secondary to-accent text-white py-16">
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="avatar">
              <div className="w-32 h-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-4 shadow-2xl">
                <img src={lessons[0]?.photo} alt={user?.name} />
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-3 drop-shadow-lg">
                {user?.name}
              </h1>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                  <FaBookOpen className="text-xl" />
                  <span className="font-semibold">{lessons.length} Lessons</span>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 flex items-center gap-2">
                  <FaHeart className="text-xl" />
                  <span className="font-semibold">Life Lesson Creator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-6xl mx-auto px-4 -mt-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-4 rounded-xl">
                <FaBookOpen className="text-3xl text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold">{lessons.length}</p>
                <p className="text-base-content/60">Total Lessons</p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/10 p-4 rounded-xl">
                <MdCategory className="text-3xl text-secondary" />
              </div>
              <div>
                <p className="text-3xl font-bold">
                  {[...new Set(lessons.map(l => l.category))].length}
                </p>
                <p className="text-base-content/60">Categories</p>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300">
            <div className="flex items-center gap-4">
              <div className="bg-accent/10 p-4 rounded-xl">
                <FaHeart className="text-3xl text-accent" />
              </div>
              <div>
                <p className="text-3xl font-bold">
                  {lessons.reduce((sum, l) => sum + (l.likes?.length || 0), 0)}
                </p>
                <p className="text-base-content/60">Total Likes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="w-full max-w-6xl mx-auto px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Published Lessons</h2>
          <p className="text-base-content/60">
            Explore all the life lessons shared by {user?.name}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lessons.map((l) => (
            <div 
              key={l._id} 
              className="group bg-base-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300 hover:-translate-y-1"
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-primary to-secondary p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:line-clamp-none transition-all">
                    {l.title}
                  </h3>
                  
                  {/* Prominent Date Display */}
                  <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-flex items-center gap-3 border border-white/30">
                    <div className="bg-white/30 p-2 rounded-lg">
                      <FaCalendarAlt className="text-lg text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-white/80 font-medium">Published On</p>
                      <p className="text-sm font-bold text-white">{l.createAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p className="text-base-content/80 mb-4 line-clamp-3">
                  {l.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {l.category && (
                    <span className="badge badge-primary badge-sm">
                      {l.category}
                    </span>
                  )}
                  {l.tone && (
                    <span className="badge badge-secondary badge-sm">
                      {l.tone}
                    </span>
                  )}
                  {l.accessLevel && (
                    <span className="badge badge-accent badge-sm">
                      {l.accessLevel}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 text-sm text-base-content/60">
                  <div className="flex items-center gap-2 bg-error/10 px-3 py-2 rounded-lg">
                    <FaHeart className="text-error" />
                    <span className="font-semibold">{l.likes?.length || 0} likes</span>
                  </div>
                </div>

                {/* View Button */}
                <Link to={`/lessonsDetails/${l._id}`}>
                  <button className="btn btn-primary w-full group-hover:btn-secondary transition-colors">
                    View Lesson Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {lessons.length === 0 && (
          <div className="text-center py-16">
            <FaBookOpen className="text-6xl text-base-content/20 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">No Lessons Yet</h3>
            <p className="text-base-content/60">
              This user hasn't published any lessons yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
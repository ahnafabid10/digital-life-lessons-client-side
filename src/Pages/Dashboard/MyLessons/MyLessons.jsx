import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaEdit, FaHeart, FaStar, FaLock, FaGlobe, FaClock } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyLessons = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: lessons = [], refetch, isLoading } = useQuery({
    queryKey: ['myLessons', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/lessons?email=${user?.email}`);
      return res.data;
    }
  });

  const handleLessonDelete = id => {
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
          .then(res => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your lesson has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <div key={item} className="bg-base-100 rounded-xl shadow-lg overflow-hidden border border-base-200">
          <div className="bg-gradient-to-br from-primary/20 to-secondary/20 h-28 animate-pulse"></div>
          <div className="p-5 space-y-4">
            <div className="h-4 bg-base-200 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-base-200 rounded w-1/2 animate-pulse"></div>
            <div className="flex gap-2">
              <div className="h-7 bg-base-200 rounded w-14 animate-pulse"></div>
              <div className="h-7 bg-base-200 rounded w-14 animate-pulse"></div>
            </div>
            <div className="flex gap-2 pt-3">
              <div className="h-9 bg-base-200 rounded flex-1 animate-pulse"></div>
              <div className="h-9 bg-base-200 rounded w-9 animate-pulse"></div>
              <div className="h-9 bg-base-200 rounded w-9 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-6 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-2">
            My Lessons
          </h2>
          <p className="text-base-content/70 text-lg">
            {isLoading ? (
              <span className="inline-block w-32 h-6 bg-base-300 rounded animate-pulse"></span>
            ) : (
              <>
                You have <span className="font-semibold text-primary">{lessons.length}</span> lesson{lessons.length !== 1 ? 's' : ''}
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {isLoading && <LoadingSkeleton />}

        {/* Empty State */}
        {!isLoading && lessons.length === 0 && (
          <div className="text-center py-16 bg-base-100 rounded-2xl shadow-lg">
            <div className="mb-6">
              <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
                <FaStar className="text-6xl text-primary/40" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-base-content mb-2">No lessons yet</h3>
            <p className="text-base-content/60 mb-6">Create your first lesson to get started!</p>
          </div>
        )}

        {/* Lessons Grid */}
        {!isLoading && lessons.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
              <div 
                key={lesson._id}
                className="bg-base-100 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-base-200 hover:border-primary/30 group hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-br from-primary to-secondary p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full -ml-10 -mb-10"></div>
                  <div className="relative">
                    <div className="flex items-start justify-between mb-2">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium">
                        #{index + 1}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {lesson.privacy === 'private' ? (
                          <FaLock className="text-white/80" size={12} />
                        ) : (
                          <FaGlobe className="text-white/80" size={12} />
                        )}
                        <span className="bg-white/20 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium capitalize">
                          {lesson.accessLevel}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1.5 line-clamp-2 min-h-[3.5rem]">
                      {lesson.title}
                    </h3>
                    <p className="text-white/90 text-sm font-medium">
                      {lesson.category}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  {/* Date */}
                  <div className="flex items-center gap-1.5 text-base-content/50 mb-4 text-xs">
                    <FaClock size={12} />
                    <span>{formatDate(lesson.createAt)}</span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className="flex items-center gap-1.5">
                      <FaHeart className="text-error" size={15} />
                      <span className="text-sm font-semibold text-base-content">{lesson?.likesCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FaStar className="text-warning" size={15} />
                      <span className="text-sm font-semibold text-base-content">{lesson?.favoritesCount || 0}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link to={`/dashboard/update-lesson/${lesson._id}`} className="flex-1">
                      <button className="w-full btn btn-primary btn-sm text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105">
                        <FaEdit size={13} />
                        <span>Edit</span>
                      </button>
                    </Link>
                    <Link to={`/lessonsDetails/${lesson._id}`}>
                      <button className="btn btn-secondary btn-sm text-white transition-all duration-200 hover:scale-105">
                        <FaMagnifyingGlass size={13} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleLessonDelete(lesson._id)}
                      className="btn btn-error btn-sm text-white transition-all duration-200 hover:scale-105"
                    >
                      <MdDelete size={15} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLessons;
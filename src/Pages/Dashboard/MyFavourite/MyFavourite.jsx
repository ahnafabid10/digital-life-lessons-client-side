import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useAuth } from '../../../Hooks/useAuth';
import { Link } from 'react-router';
import LoadingPage from '../../LoadingPage/LoadingPage';

const MyFavourite = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [category, setCategory] = useState('');

  const { data: favourites = [], isLoading } = useQuery({
    queryKey: ['favourites', user?.email],
    queryFn: async () => {
      if (!user?.email) return [];
      const favRes = await axiosSecure.get(`/favourite?email=${user.email}`);
      const favLessons = await Promise.all(
        favRes.data.map(async fav => {
          const lessonRes = await axiosSecure.get(`/lessons/${fav.lessonId}`);
          return {...lessonRes.data, favouriteId:fav._id};
        })
      );
      return favLessons;
    },
  });

  if (isLoading) return <LoadingPage />;

  const filter = favourites.filter(f => {
    const matchCategory = category ? f.category === category : true;
    return matchCategory;
  });

  const handleRemoveFavourite = (id) => {
    axiosSecure.delete(`/favourite/${id}`)
      .then(res => {
        console.log(res.data);
      });
  };

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'Relationships', label: 'Relationships' },
    { value: 'Personal Growth', label: 'Personal Growth' },
    { value: 'Mistakes Learned', label: 'Mistakes Learned' },
    { value: 'Mindset', label: 'Mindset' },
    { value: 'Career', label: 'Career' }
  ];

  const getCategoryColor = (cat) => {
    const colors = {
      'Relationships': 'badge-error',
      'Personal Growth': 'badge-success',
      'Mistakes Learned': 'badge-warning',
      'Mindset': 'badge-info',
      'Career': 'badge-secondary'
    };
    return colors[cat] || 'badge-ghost';
  };

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <svg className="w-8 h-8 text-primary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <h1 className="text-4xl font-bold text-base-content">My Favourite Lessons</h1>
          </div>
          <p className="text-base-content/70 text-lg">
            You have <span className="font-semibold text-primary">{favourites.length}</span> lessons saved for later
          </p>
        </div>

        {/* Filter Section */}
        <div className="bg-base-100 rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-5 h-5 text-primary fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            </svg>
            <h2 className="text-xl font-semibold text-base-content">Filter by Category</h2>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`btn btn-sm ${
                  category === cat.value 
                    ? 'btn-primary' 
                    : 'btn-ghost'
                } transition-all duration-200`}
              >
                {cat.label}
                {category === cat.value && (
                  <span className="ml-2 badge badge-sm bg-white text-primary">
                    {cat.value === '' ? favourites.length : filter.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        {filter.length === 0 ? (
          <div className="text-center py-16 bg-base-100 rounded-2xl shadow-lg">
            <svg className="w-16 h-16 mx-auto mb-4 text-base-content/30 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <h3 className="text-2xl font-semibold text-base-content mb-2">
              No lessons found
            </h3>
            <p className="text-base-content/60">
              Try selecting a different category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filter.map((lesson) => (
              <div
                key={lesson._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
              >
                {/* Card Header with gradient */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
                
                <div className="card-body">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`badge ${getCategoryColor(lesson.category)} badge-sm`}>
                      {lesson.category}
                    </span>
                    <svg className="w-5 h-5 text-primary fill-current opacity-70 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </div>

                  {/* Title */}
                  <h3 className="card-title text-base-content group-hover:text-primary transition-colors mb-2">
                    {lesson.title}
                  </h3>

                  {/* Description */}
                  <p className="text-base-content/70 text-sm mb-4 flex-grow">
                    {lesson.description?.slice(0, 100)}...
                  </p>

                  {/* Actions */}
                  <div className="card-actions flex-col gap-2">
                    <Link
                      to={`/lessons/${lesson._id}`}
                      className="btn btn-primary w-full group-hover:btn-secondary transition-all"
                    >
                      View Lesson
                      <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                    
                    <button 
                      onClick={() => handleRemoveFavourite(lesson.favouriteId)} 
                      className="btn btn-ghost w-full hover:btn-error hover:text-white transition-all"
                    >
                      <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                      </svg>
                      Remove from Favourites
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

export default MyFavourite;
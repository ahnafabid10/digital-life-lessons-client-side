import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FaBookmark } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from 'react-router';

const MostSavedLessons = () => {

  const axiosSecure = useAxiosSecure()
  const { data: lessons = [], isLoading } = useQuery({
    queryKey: ['mostSavedLessons'],
    queryFn: async () => {
      const res = await axiosSecure.get('/lessons/most-saved');
      return res.data;
    }
  });

  if (isLoading) return <span className="loading loading-infinity loading-xl"></span>;

    return (
        <div>
            <section className="py-16 bg-base-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-12">
<h2 className="text-3xl md:text-4xl font-bold text-primary">Most Saved Life Lessons</h2>
<p className="mt-3 text-base-content/70">Life lessons our community saves the most</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
{lessons.map((lesson) => (
    <div key={lesson.id} className="card bg-base-200 shadow-md hover:shadow-xl transition">
              <div className="card-body">
                
                <div className="flex justify-between items-start">
     <h3 className="card-title text-lg">{lesson.title}</h3>
    
    <div className="flex items-center gap-1 text-secondary">
      <span className="text-sm font-semibold">{lesson.favoritesCount || 0}</span><FaBookmark />
          <span className="text-sm font-semibold">{lesson.saved}</span>
              </div>
                </div>

        <p className="text-sm text-base-content/80 mt-2 line-clamp-3">{lesson.description}</p>
        <div className="card-actions justify-between items-center mt-4">
            <span className="badge badge-outline badge-primary">{lesson.category}</span>
            <Link to={`/lessonsDetails/${lesson._id}`} className='btn btn-sm btn-primary btn-outline'>Read More</Link>
            </div>

              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {lessons.length === 0 && (
          <p className="text-center mt-10 text-base-content/60">
            No lessons found yet 🌱
          </p>
        )}
      </div>
    </section>
        </div>
    );
};

export default MostSavedLessons;
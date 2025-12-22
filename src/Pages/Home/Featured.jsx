import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBookmark } from 'react-icons/fa';

const Featured = () => {
    const axiosSecure = useAxiosSecure()
    const {data: featured =[]} = useQuery({
        queryKey: ['featured'],
        queryFn: async()=>{
            const res= await axiosSecure.get('/lessons/?status=featured')
            console.log('djsvfhjsfnvjrnj', res.data)
            return res.data
        }
    })
    console.log("llllllllllllllllllll",featured)
    return (
        <div>
            <div>
                        <section className="py-16 bg-base-100">
                  <div className="max-w-7xl mx-auto px-4">
            
                    <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Featured Life Lessons</h2>
            <p className="mt-3 text-base-content/70">  Powerful life lessons that inspire, guide, and shape better decisions
</p>
                    </div>
            
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured?.map((lesson) => (
                <div key={lesson.id} className="card bg-base-200 shadow-md hover:shadow-xl transition">
                          <div className="card-body">
                            
                            <div className="flex justify-between items-start">
                 <h3 className="card-title text-lg">{lesson.title}</h3>
            
                <div className="flex items-center gap-1 text-secondary"><FaBookmark />
                      <span className="text-sm font-semibold">{lesson.saved}</span>
                          </div>
                            </div>
            
                    <p className="text-sm text-base-content/80 mt-2 line-clamp-3">{lesson.description}</p>
                    <div className="card-actions justify-between items-center mt-4">
                        <span className="badge badge-outline badge-primary">{lesson.category}</span>
                        <Link to={`/lessonsDetails/${lesson._id}`}><button className="btn btn-sm btn-primary btn-outline">Read More</button>
                        </Link>
                    
                        </div>
            
                          </div>
                        </div>
                      ))}
                    </div>
        
                  </div>
                </section>
                    </div>
        </div>
    );
};

export default Featured;
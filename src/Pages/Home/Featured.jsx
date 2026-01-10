import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import { FaBookmark, FaArrowRight, FaStar } from 'react-icons/fa';

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
        <div className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/30 to-white py-20">
            {/* Decorative background elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
            
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full mb-6">
                        <FaStar className="text-primary w-4 h-4" />
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Featured Content</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Featured Life Lessons
                        </span>
                    </h2>
                    
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Powerful life lessons that inspire, guide, and shape better decisions
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {featured?.map((lesson, index) => (
                        <div 
                            key={lesson.id} 
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                            }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Featured badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <div className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                                    <FaStar className="w-3.5 h-3.5" />
                                    Featured
                                </div>
                            </div>

                            <div className="card-body p-6 relative z-10 flex flex-col h-full">
                                {/* Title */}
                                <div className="mb-4 pr-20">
                                    <h3 className="card-title text-xl font-bold text-gray-800 group-hover:text-primary transition-colors duration-300 leading-snug">
                                        {lesson.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                                    {lesson.description}
                                </p>

                                {/* Footer */}
                                <div className="flex justify-between items-center pt-4 border-t border-primary/10 mt-auto">
                                    <span className="badge bg-primary/10 text-primary border-0 font-semibold px-4 py-3">
                                        {lesson.category}
                                    </span>
                                    
                                    <Link to={`/lessonsDetails/${lesson._id}`}>
                                        <button className="btn btn-sm bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-bold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg group/btn">
                                            Read More
                                            <FaArrowRight className="w-3.5 h-3.5 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom gradient line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-16">
                    <Link to="/publicLessons">
                        <button className="btn btn-lg bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-bold px-10 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                            View All Lessons
                            <FaArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </Link>
                </div>
            </section>

            <style>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default Featured;
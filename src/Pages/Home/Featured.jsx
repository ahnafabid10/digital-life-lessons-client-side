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
        <div className="relative overflow-hidden bg-gradient-to-b from-base-100 via-primary/5 to-base-100 py-20">
            {/* Decorative background elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/10 dark:bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 dark:bg-primary/3 rounded-full blur-3xl"></div>
            
            <section className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-5 py-2 rounded-full mb-6">
                        <FaStar className="text-primary w-4 h-4" />
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider">Featured Content</span>
                    </div>
                    
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                            Featured Life Lessons
                        </span>
                    </h2>
                    
                    <p className="text-base sm:text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                        Powerful life lessons that inspire, guide, and shape better decisions
                    </p>
                </div>

                {/* Cards Grid - 4 columns layout */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {featured?.map((lesson, index) => (
                        <div 
                            key={lesson.id} 
                            className="group relative bg-base-100 rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-primary/10 dark:hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden border border-primary/10 dark:border-primary/20"
                            style={{
                                animation: `fadeInUp 0.6s ease-out ${index * 0.08}s both`
                            }}
                        >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            {/* Featured badge */}
                            <div className="absolute top-4 right-4 z-10">
                                <div className="bg-gradient-to-r from-primary to-secondary text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5">
                                    <FaStar className="w-3 h-3" />
                                    Featured
                                </div>
                            </div>

                            <div className="p-6 relative z-10 flex flex-col h-full min-h-[280px]">
                                {/* Title */}
                                <div className="mb-3 pr-20">
                                    <h3 className="text-lg font-bold text-base-content group-hover:text-primary transition-colors duration-300 leading-snug line-clamp-2">
                                        {lesson.title}
                                    </h3>
                                </div>

                                {/* Description */}
                                <p className="text-sm text-base-content/70 leading-relaxed line-clamp-3 mb-5 flex-grow">
                                    {lesson.description}
                                </p>

                                {/* Footer */}
                                <div className="flex flex-col gap-3 pt-4 border-t border-primary/10 dark:border-primary/20 mt-auto">
                                    <span className="badge bg-primary/10 dark:bg-primary/20 text-primary border-0 font-semibold px-3 py-2 text-xs w-fit">
                                        {lesson.category}
                                    </span>
                                    
                                    <Link to={`/lessonsDetails/${lesson._id}`} className="w-full">
                                        <button className="btn btn-sm w-full bg-gradient-to-r from-primary to-secondary text-white border-0 rounded-full font-semibold hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg group/btn">
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
                
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
};

export default Featured;
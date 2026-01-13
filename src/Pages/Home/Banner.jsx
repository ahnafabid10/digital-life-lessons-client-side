import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y, Autoplay, EffectCreative } from 'swiper/modules';
import { FaStar, FaHeart, FaLightbulb, FaRocket } from 'react-icons/fa';
import img1 from '../../assets/Jan-24-2024.jpg'
import img2 from '../../assets/pexels-cottonbro-5124849.jpg'
import img3 from '../../assets/pexels-pok-rie-33563-412086.jpg'
import img4 from '../../assets/pexels-thought-catalog-317580-2228557.jpg'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const Banner = () => {
    const slides = [
        {
            img: img1,
            title: "Mistakes, struggles, and growth shape who you become.",
            subtitle: "Embrace the journey of transformation",
            icon: FaStar
        },
        {
            img: img2,
            title: "Real wisdom comes from living, failing, and trying again.",
            subtitle: "Every setback is a setup for a comeback",
            icon: FaHeart
        },
        {
            img: img3,
            title: "Every experience teaches a lesson—if you're willing to listen.",
            subtitle: "Open your mind to life's teachings",
            icon: FaLightbulb
        },
        {
            img: img4,
            title: "Each phase of life carries a lesson worth learning.",
            subtitle: "Growth happens one moment at a time",
            icon: FaRocket
        }
    ];

    return (
        <div className="w-full h-[92vh] relative bg-base-200 overflow-hidden">
            {/* Animated background particles using theme colors */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700"></div>
            </div>

            <Swiper
                modules={[Pagination, A11y, Autoplay, EffectCreative]}
                effect="creative"
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: ['-20%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }}
                grabCursor={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                speed={1000}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white/70 !opacity-100 transition-all duration-300',
                    bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !opacity-100 !w-12 !h-3 !rounded-full scale-110'
                }}
                className='h-full w-full'
            >
                {slides.map((slide, index) => {
                    const Icon = slide.icon;
                    return (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full group">
                                {/* Image with zoom effect */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img 
                                        src={slide.img} 
                                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[3000ms]" 
                                        alt={slide.title}
                                    />
                                </div>
                                
                                {/* Multi-layer gradient overlay using theme colors */}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/60 to-transparent"></div>
                                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20"></div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                                
                                {/* Animated decorative elements using theme colors */}
                                <div className="absolute top-1/4 right-10 w-32 h-32 border-4 border-white/20 rounded-full animate-spin-slow hidden lg:block"></div>
                                <div className="absolute bottom-1/3 left-20 w-20 h-20 border-4 border-secondary/30 rounded-lg rotate-45 animate-pulse hidden lg:block"></div>
                                
                                {/* Content */}
                                <div className="absolute inset-0 flex items-center justify-center lg:justify-start px-6 sm:px-12 lg:px-24">
                                    <div className="max-w-4xl space-y-8 animate-fade-in">
                                        {/* Icon badge with glow effect */}
                                        <div className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-xl px-6 py-3 rounded-full border border-white/30 shadow-2xl hover:scale-105 transition-transform duration-300">
                                            <div className="relative">
                                                <Icon className="w-6 h-6 text-white relative z-10" />
                                                <div className="absolute inset-0 bg-white/50 rounded-full blur-md"></div>
                                            </div>
                                            <span className="text-white font-bold text-sm uppercase tracking-[0.2em]">
                                                Life Lesson {index + 1}
                                            </span>
                                        </div>
                                        
                                        {/* Main title with text shadow */}
                                        <h2 className="text-white text-3xl sm:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-2xl">
                                            {slide.title}
                                        </h2>
                                        
                                        {/* Subtitle */}
                                        <p className="text-white/90 text-lg sm:text-xl lg:text-2xl font-medium max-w-2xl drop-shadow-lg">
                                            {slide.subtitle}
                                        </p>
                                        
                                        {/* CTA Buttons using theme colors */}
                                        <div className="flex flex-wrap gap-4 pt-4">
                                            <button className="group/btn relative btn btn-lg bg-white text-primary hover:bg-white border-0 font-bold shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-white/50">
                                                <span className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></span>
                                                <span className="relative flex items-center gap-2">
                                                    Discover More
                                                    <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </span>
                                            </button>
                                            
                                            <button className="group/btn relative btn btn-lg btn-ghost border-2 border-white/80 text-white hover:bg-white hover:text-primary hover:border-white font-bold backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-xl">
                                                <span className="relative flex items-center gap-2">
                                                    Get Started
                                                    <svg className="w-5 h-5 group-hover/btn:rotate-45 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>

                                        {/* Stats or features */}
                                        <div className="flex flex-wrap gap-6 pt-6 opacity-90">
                                            <div className="flex items-center gap-2 text-white">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                                <span className="text-sm font-medium">Interactive Learning</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
                                                <span className="text-sm font-medium">Real-Life Stories</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white">
                                                <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-500"></div>
                                                <span className="text-sm font-medium">Expert Insights</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Scroll indicator */}
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce hidden sm:flex">
                                    <span className="text-white text-xs uppercase tracking-widest font-semibold">Scroll Down</span>
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out;
                }
                
                .animate-spin-slow {
                    animation: spin-slow 20s linear infinite;
                }
                
                .delay-200 {
                    animation-delay: 200ms;
                }
                
                .delay-500 {
                    animation-delay: 500ms;
                }
                
                .delay-700 {
                    animation-delay: 700ms;
                }
            `}</style>
        </div>
    );
};

export default Banner;
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
            icon: FaStar
        },
        {
            img: img2,
            title: "Real wisdom comes from living, failing, and trying again.",
            icon: FaHeart
        },
        {
            img: img3,
            title: "Every experience teaches a lesson—if you're willing to listen.",
            icon: FaLightbulb
        },
        {
            img: img4,
            title: "Each phase of life carries a lesson worth learning.",
            icon: FaRocket
        }
    ];

    return (
        <div className="w-full h-[92vh] relative  bg-base-200">
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
                speed={800}
                pagination={{ 
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet !w-3 !h-3 !bg-white !opacity-60',
                    bulletActiveClass:     'swiper-pagination-bullet-active !bg-white opacity-60 !w-14 !h-2 !rounded-xl'
                }}
                className='h-full w-full'
            >
                {slides.map((slide, index) => {
                    const Icon = slide.icon;
                    return (
                        <SwiperSlide key={index}>
                            <div className="relative w-full h-full">
                                <img 
                                    src={slide.img} 
                                    className="absolute inset-0 w-full h-full object-cover" 
                                    alt=""
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
                                
                                <div className="absolute inset-0 flex items-end pb-20 sm:pb-32 px-6 sm:px-12 lg:px-24">
                                    <div className="max-w-4xl">
                                        <div className="mb-6 inline-flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20">
                                            <Icon className="w-6 h-6 text-white" />
                                            <span className="text-white font-semibold text-sm uppercase tracking-widest">Life Lesson {index + 1}</span>
                                        </div>
                                        
                                        <h2 className="text-white text-3xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-10">
                                            {slide.title}
                                        </h2>
                                        
                                        <div className="flex flex-wrap gap-4">
                                            <button className="btn btn-lg bg-white text-primary hover:bg-white/90 border-0 font-bold shadow-xl">
                                                Discover More
                                            </button>
                                            <button className="btn btn-lg btn-outline border-2 border-white text-white hover:bg-white hover:text-primary font-bold">
                                                Get Started
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Banner;
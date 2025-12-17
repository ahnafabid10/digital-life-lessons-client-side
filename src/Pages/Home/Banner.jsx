import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import img1 from '../../assets/Jan-24-2024.jpg'
import img2 from '../../assets/pexels-cottonbro-5124849.jpg'
import img3 from '../../assets/pexels-pok-rie-33563-412086.jpg'
import img4 from '../../assets/pexels-thought-catalog-317580-2228557.jpg'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Banner = () => {
    return (
            <Swiper
      modules={[ Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
    //   navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className='h-[90vh] w-full object-cover items-center'
    >
      <SwiperSlide className="relative">
  <img src={img1} className="h-full w-full object-cover" />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h2 className="text-white text-5xl font-bold">
      Mistakes, struggles, and growth shape who you become.
    </h2>
  </div>
</SwiperSlide>
      <SwiperSlide className="relative">
  <img src={img2} className="h-full w-full object-cover" />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h2 className="text-white text-5xl font-bold">
      Real wisdom comes from living, failing, and trying again.
    </h2>
  </div>
</SwiperSlide>
      <SwiperSlide className="relative">
  <img src={img3} className="h-full w-full object-cover" />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h2 className="text-white text-5xl font-bold">
      Every experience teaches a lesson—if you’re willing to listen.
    </h2>
  </div>
</SwiperSlide>
      <SwiperSlide className="relative">
  <img src={img4} className="h-full w-full object-cover" />
  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
    <h2 className="text-white text-5xl font-bold">
      Each phase of life carries a lesson worth learning.
    </h2>
  </div>
</SwiperSlide>
      
      ...
    </Swiper>
    );
};

export default Banner;
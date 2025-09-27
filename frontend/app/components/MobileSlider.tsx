'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import TourCard from './TourCard';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TourPackage {
  id?: string;
  title: string;
  location: string;
  duration: string;
  nights: number;
  days: number;
  price: number;
  totalPrice: number;
  image: string;
  inclusions: string[];
  activities: string[];
  link: string;
}

interface MobileSliderProps {
  tourPackages: TourPackage[];
}

export default function MobileSlider({ tourPackages }: MobileSliderProps) {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Custom navigation buttons - positioned at top right */}
      <div className="absolute top-0 right-0 z-10 flex space-x-2 mb-2 mr-2">
        <div 
          ref={prevRef} 
          className="bg-white/80 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </div>
        
        <div 
          ref={nextRef} 
          className="bg-white/80 hover:bg-white shadow-md rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-700">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1}
        centeredSlides={false}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onInit={(swiper) => {
          // @ts-expect-error - Swiper navigation type issue
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error - Swiper navigation type issue
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        className="pb-10"
      >
        {tourPackages.map((tour, index) => (
          <SwiperSlide key={index} className="w-full">
            <TourCard 
              title={tour.title}
              location={tour.location}
              duration={tour.duration}
              nights={tour.nights}
              days={tour.days}
              price={tour.price}
              totalPrice={tour.totalPrice}
              image={tour.image}
              inclusions={tour.inclusions}
              activities={tour.activities}
              link={tour.link}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
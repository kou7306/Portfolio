'use client';

import Link from 'next/link';
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './Slider.css';
import type { WorkSliderData } from '../types';
import Tilt from 'react-parallax-tilt';

interface SliderProps {
  datas: WorkSliderData[];
}

export default function Slider({ datas }: SliderProps) {
  const slideSettings = {
    0: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings}
      slidesPerView={"auto"}
      centeredSlides={true}
      loop={true}
      speed={3000}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      className='slide-wrapper'
    >
      {datas.map((data, index) => (
        <SwiperSlide key={index}>
          <Link href={`/works/${data.id}`}>
            <Tilt
              tiltMaxAngleX={8}
              tiltMaxAngleY={8}
              glareEnable={true}
              glareMaxOpacity={0.2}
              glareColor="#5ce1ff"
              glarePosition="all"
              glareBorderRadius="6px"
              scale={1.02}
              className="sao-slide-tilt"
            >
              <div className="sao-slide-card">
                <img
                  src={data.imageUrl}
                  className='slideImage'
                  alt={`Slide ${index + 1}`}
                />
                <div className="sao-slide-overlay" />
                <div className="sao-slide-corner sao-slide-corner-tl" />
                <div className="sao-slide-corner sao-slide-corner-br" />
              </div>
            </Tilt>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

"use client";

import React from 'react'

// オプションをインポートする
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import './Slider.css';

// publicフォルダの画像
const images = [
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    "https://placehold.jp/150x150.png",
    
  ];
export default function Slider() {
    // ブレイクポイントに基づいて1つのスライドに表示するスライドの数を指定
   const slideSettings = {
     0: {
       slidesPerView: 3,
       spaceBetween: 10,
     },
     1024: {
       slidesPerView: 3,
       spaceBetween: 2,
     },
   };


  return (
    <>
           <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings} // slidesPerViewを指定
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true} // スライドを中央に配置
      loopedSlides = {3}
      loop={true} // スライドをループさせる
      speed={3000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }} // スライド表示時間
    //   navigation // ナビゲーション（左右の矢印）
    //   pagination={{
    //     clickable: true,
    //   }} // ページネーション, クリックで対象のスライドに切り替わる
      className='slide-wrapper'
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img src={image} className='slideImage' alt={`Slide ${index + 1}`} />
        </SwiperSlide>
      ))}
    </Swiper>

    </>

  )
}


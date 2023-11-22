import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "react-router-dom";
const HomeBanner = () => {
  return (
    <>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}>
          <SwiperSlide><img style={{ cursor: 'pointer' }} src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-huf-desktop.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img style={{ cursor: 'pointer' }} src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-adidas-desktop.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img style={{ cursor: 'pointer' }} src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-_puma_x_staple_-_banner_1.jpg" alt="" /></SwiperSlide>
          <SwiperSlide><img style={{ cursor: 'pointer' }} src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-_cloud_x_3_ad_-desktop___2.jpg" alt="" /></SwiperSlide>
        </Swiper>
    </>
  );
};

export default HomeBanner;

import React from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import HomeLogo from "../Components/Cores/CoreHome/HomeLogo";
import HeaderSearch from "../Components/Cores/CoreHome/HeaderSearch";
import HomeInline from "../Components/Cores/CoreHome/HomeInline";
import ProductCarousel from "../Components/Cores/CoreHome/ProductCarousel";
import HomeMainLogo from "../Components/Cores/CoreHome/HomeMainLogo";
import HomeFooterLogo from "../Components/Cores/CoreHome/HomeFooterLogo";
import HomeFootLogo from "../Components/Cores/CoreHome/HomeFootLogo";

const Home = () => {
    const justInImages = [
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/c/2/c211a5489efcd4262ee22be65e376fe4c32779abd63071d82839b28395555a4a.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/2/c/2c9977e96f796b286789322e2a30ef1590dd3248d91bb1f5943ca881b3e0e30d.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/9/b/9beca4ff88b154e4ff7a6d128f4826d0e8f96117a97268a81b24d18533497ab1.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/c/b/cb63a52464ae41fd66623e58616790ad8e3cb3e08cf14f04586ed3190c01d789.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/9/79b64d35255ec55a396efe9caef090247f5144463b780c24b3491a6c3c659dc2.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/6/7697aee8a930e792450fe843e0671e7a410559ac358eda66973aa8aa8489f0e2.jpeg",
      ];

    const winterArrivals = [
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/1/2/12520f82325829406446515f588c38cb363d4abc442abe1a1e88e8662ef66b62.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/7/b7148e70846b6fd24a949c652c6eb0fdc271cce86c127d0528bbbfb479f48392.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/d/ed6bc9d310203582880e8595319d025ec5ed88d96523eddbc75698fdc9a7dfbf.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/8/7896d933cc273ebc3238707fff2b3d45f94eefe9a35501f263cc020222231ff8.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/s/n/snkr_2023_nov_7nov_pf00572-grp-a.png",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/8/7896d933cc273ebc3238707fff2b3d45f94eefe9a35501f263cc020222231ff8.jpeg"

    ];  

    const onRunnings = [
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/7/5/75ac6409bc9d1f71f31adfa7c83664c1a76f5721b97fa4506339ec45616cdbcf.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/4/b4dc9095f8a56bd040ade0098e5bef0a9878d713a414712a8422781e14378136.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/e/6/e6f4c586708bc4168c36f490eff2ff09de5f95eef80f822138d000193c605fbd.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/6/f/6fed8febe2020945684a94cb7aab50bd3e523ee93e21310d60eaf73f112993b1.jpeg",
        "https://prod.aaw.com/media/catalog/product/cache/f7004b71e64366ff7dbeac9cccf91df6/b/4/b4dc9095f8a56bd040ade0098e5bef0a9878d713a414712a8422781e14378136.jpeg"
    ];

  return (
    <>
      <HeaderSearch />
      <div style={{ maxWidth: "80%", alignItems: "center", margin: "10px auto" }}>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={true}
        >
          <SwiperSlide>
            <img
              src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-huf-desktop.jpg"
              alt=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-adidas-desktop.jpg"
              alt=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-_puma_x_staple_-_banner_1.jpg"
              alt=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-_cloud_x_3_ad_-desktop___2.jpg"
              alt=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-nike-desktop_2.jpg"
              alt=""
              style={{ width: "100%", textAlign: "center" }}
            />
          </SwiperSlide>
        </Swiper>
        <HomeLogo />
        <HomeInline inlineData="Just In" />
        <ProductCarousel imgArr={justInImages}/>
        <HomeMainLogo />
        <HomeInline inlineData="Winter Arrivals" />
        <ProductCarousel imgArr={winterArrivals}/>
        <HomeFooterLogo />
        <HomeInline inlineData="On Running" />
        <ProductCarousel imgArr={onRunnings}/>
        <HomeFootLogo/>
      </div>
    </>
  );
};

export default Home;

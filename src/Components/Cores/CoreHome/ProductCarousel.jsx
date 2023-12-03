import React from "react";
import { useState, useEffect } from "react";


import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper/modules";
import "../../../Css/productCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { baseUrl } from "../../Commons/BaseUrl";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../../GraphQlQueries/AllQueries";

const ProductCarousel = ({ imgArr }) => {
  const [products, setProducts] = useState([]);
  const errorHandling = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  useEffect(() => {
    // Fetch products from the API
    const fetchData = async (url) => {
      try {
        const res = await fetchAllProducts(); // Custom graphQl Query Functions...................
        setProducts(res); // Assuming the API returns an array of product objects
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData(baseUrl);
  }, []);

  return (
    <>
      <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
          spaceBetween={0}
          // slidesPerView={5}
          // navigation={{
          //   prevEl: '.swiper-button-prev',
          //   nextEl: '.swiper-button-next'
          // }}
          navigation
          // pagination={{ clickable: true }}
          // scrollbar={{ draggable: true }}
          autoplay={true}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log("slide change")}
          breakpoints={{
            // when window width is >= 640px
            375: {
              width: 300,
              slidesPerView: 1,
            },
            430: {
              width: 350,
              slidesPerView: 1,
            },
            640: {
              width: 640,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              width: 700,
              slidesPerView: 2,
            },

            900: {
              width: 900,
              slidesPerView: 2,
            },
            1024: {
              width: 1150,
              slidesPerView: 2,
            },
            1150: {
              width: 1150,
              slidesPerView: 3,
            },
          }}
        >
          {products?.length !== 0 ? (
            <>
              {products?.map((product, index) => {
                return (
                  <>
                    <SwiperSlide>
                      <div className="product-card" key={index}>
                        <img
                          src={imgArr[index % imgArr.length]}
                          alt={`Product ${index + 1}`}
                          style={{ width: "160px" }}
                          className="product-image"
                        />
                        <div className="product-details">
                          <p className="product-name"><Link style={{ color: 'black', textDecoration: 'none', fontSize: '0.8rem' }} to={`/productDetail/${product?.url_key}`}>{product?.name}</Link></p>
                          <p className="product-price-carousel">
                            {product?.price?.regularPrice?.amount?.currency}{" "}
                            {product?.price?.regularPrice?.amount?.value}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  </>
                );
              })}
            </>
          ) : (
            <>
              <div style={errorHandling}>
                <h3>Trying to load Products Slider!!!!Check API URL!!!</h3>
              </div>
            </>
          )}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;

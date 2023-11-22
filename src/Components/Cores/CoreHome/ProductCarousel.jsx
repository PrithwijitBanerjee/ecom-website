import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Navigation, Pagination, Scrollbar, A11y,Autoplay } from "swiper/modules";
import "../../../Css/productCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { baseUrl } from "../../Commons/BaseUrl";

const ProductCarousel = ({ imgArr }) => {
  const [products, setProducts] = useState([]);

  const Query = `{
    products(search: "", pageSize: 50) {
      items {
        id
        name
        sku
        price {
          regularPrice {
            amount {
              value
              currency
            }
          }
        }
        image {
          url
        }
      }
    }
  }`;

  useEffect(() => {
    // Fetch products from the API
    const fetchData = async (url) => {
      try {
        const res = await axios.post(url, {
          query: Query,
        });
        setProducts(res?.data?.data?.products?.items); // Assuming the API returns an array of product objects
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
          modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
          // spaceBetween={292}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={true}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log("slide change")}
          breakpoints={{
            // when window width is >= 640px
            300: {
              width: 300,
              slidesPerView: 1,
            },
            640: {
              width: 640,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              width: 700,
              slidesPerView: 3,
            },

            900: {
              width: 900,
              slidesPerView: 4,
            },
            1150: {
              width: 1150,
              slidesPerView: 5,
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
                          <h5 className="product-name">{product?.name}</h5>

                          <p className="product-price">
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
            ""
          )}
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;

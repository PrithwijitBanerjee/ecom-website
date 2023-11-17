import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "../../../Css/productCarousel.css";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { baseUrl } from "../../Commons/BaseUrl";

const ProductCarousel = ({imgArr}) => {
  const [products, setProducts] = useState([]);
  
  const Query = `{
    products(search: "", pageSize: 10) {
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
        console.log(res?.data?.data?.products?.items);
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
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={300}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={true}
          //   onSwiper={(swiper) => console.log(swiper)}
          //   onSlideChange={() => console.log("slide change")}
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
                          style={{ height: "300px", width: "300px" }}
                          className="product-image"
                        />
                        <div className="product-details">
                          <h3 className="product-name">{product?.name}</h3>

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

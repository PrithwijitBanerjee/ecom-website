import React, { useEffect, useState } from "react";
import HeaderSearch from "../Components/Cores/CoreHome/HeaderSearch";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../Css/productDetailStyle.css";
import {
  clearError,
  clearItem,
  fetchParticularProductAsync,
} from "../Reducers/singleProductSlice";
import { statusData } from "../Reducers/productSlice";
import { createEmptyCartAsync } from "../Reducers/emptyCartSlice";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [showFullContent, setShowFullContent] = useState(false);
  const { status: loadingStatus, item } = useSelector(
    (state) => state?.singleData
  );
  const { key } = useParams();

  useEffect(() => {
    dispatch(fetchParticularProductAsync({ url_key: key })); // Asynchronous Operation......
    dispatch(createEmptyCartAsync());
    return () => {
      // Clean Up Function.......
      dispatch(clearItem());
    };
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(clearError());
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (loadingStatus === statusData?.ERROR) {
    return (
      <div
        className="product-list-container error-container"
        style={{ margin: "100px 0px" }}
      >
        <div className="error-content">
          <h2>An error occurred To Load Product Description!</h2>
        </div>
        <button className="retry-button" onClick={handleRefresh}>
          Retry
        </button>
      </div>
    );
  }
  const skeletonLoader = (
    <div className="skeleton">
      {/* Placeholder skeleton elements */}
      <div className="skeleton-image"></div>
      <div className="skeleton-details">
        <div className="skeleton-header"></div>
        <div className="skeleton-value"></div>
        {/* Add more skeleton placeholders for other sections */}
      </div>
    </div>
  );

  if (loadingStatus === statusData?.LOADING || !item) {
    return (
      <>
        <HeaderSearch />
        {skeletonLoader} {/* Display skeleton loader */}
      </>
    );
  }

  if (loadingStatus === statusData?.ERROR) {
    return (
      <div className="product-list-container error-container">
        <div className="error-content">
          <h2>An error occurred! Check your Api connection</h2>
        </div>
        <button className="retry-button" onClick={handleRefresh}>
          Retry
        </button>
      </div>
    );
  }
  return (
    <>
      <HeaderSearch />
      <div className="main-product-container">
        <div className="product-info">
          <div className="image-container">
            <div className="first-image-container">
              <img src={item?.image?.url} alt="" className="responsive-image" />
            </div>
            <div className="second-image-container">
              <img src={item?.image?.url} alt="" className="responsive-image" />
            </div>
          </div>
          <div className="product-content">
            <div className="product-header">
              <h2
                style={{
                  color: "rgb(0,162,254)",
                  margin: "20px",
                }}
                className="header-stock-info"
              >
                Product Information
              </h2>
              <div className="value">
                {showFullContent ? (
                  <>
                    {/* Full content */}
                    Dressed in a Medium Olive, Pale Vanilla, Cargo Khaki, Black,
                    and Sail color scheme. This offering of the Air Jordan 4
                    comes with a split upper constructed in a mix leather,
                    suede, and textile materials. It features an Olive base with
                    Black detailing on the supported wings, molded eyelets,
                    tongue labels, heel tabs, inner lining, and portion of the
                    midsole. Pale Vanilla Jumpman branding atop a Sail midsole
                    with visible Air-sole unit in the heel and Grey underfoot
                    completes the design. The shoe will also come housed in
                    special packaging.
                  </>
                ) : (
                  <>
                    {/* Shortened content */}
                    Dressed in a Medium Olive, Pale Vanilla, Cargo Khaki, Black,
                    and Sail color scheme.
                    {/* Load more button */}
                    <button className="load-more-button" onClick={() => setShowFullContent(true)}>
                      Load More
                    </button>
                  </>
                )}
              </div>
              <div className="product-stock-detail">
                <p style={{ textAlign: 'left' }}>Our best-selling fleece for a reason, Club Fleece has a cozy, familiar feel and consistent fit you can return to again and again. Brushed for added warmth and softness, it’s an ideal layer for colder temperatures.
                  Soft and stretchy, the ribbed cuffs help show off your shoes.</p>
              </div>
              <div  className="product-more-detail-container">
                <h3>More Details</h3>
                <ul className="product-more-detail-list-items">
                  <li className="product-more-detail-list-item">80% cotton/20% polyester</li>
                  <li className="product-more-detail-list-item">Embroidered Futura logo</li>
                  <li className="product-more-detail-list-item">Flat drawcord and elastic waist</li>
                  <li className="product-more-detail-list-item">Hand pockets</li>
                  <li className="product-more-detail-list-item">Machine wash</li>
                  <li className="product-more-detail-list-item">Imported</li>
                </ul>
              </div>
            </div>
            <div className="more-stock-images">
                <img src={item?.image?.url} alt="" className="responsive-image"/>
                <img src={item?.image?.url} alt="" className="responsive-image"/>
            </div>
            <div className="product-stock-review">
              <h2
                style={{
                  color: "rgb(0,162,254)",
                  margin: "20px",
                }}
                className="header-stock-info"
              >
                Customer Reviews
              </h2>
            </div>
            <div className="">You can be the first to review it.</div>
          </div>
        </div>
        <div className="product-sidebar">
          <span className="single-product-title">{item.name}</span>
          <div className="product-stock-sku">{item?.sku}</div>
          <div className="product-stock-price">
            {item?.price?.regularPrice?.amount?.currency}{" "}
            {item?.price?.regularPrice?.amount?.value}
          </div>
          <div className="product-stock-slider-container">
            <select className="custom-select">
              <option>Select Capacity</option>
              <option>Standard</option>
            </select>
            <select className="custom-select">
              <option>Select Variant</option>
              <option>1 Unit</option>
            </select>
          </div>
          <div className="product-stock-quantity">
            Quantity:
            <div className="quantity-control">
              <button className="quantity-btn" onClick={decreaseQuantity}>
                -
              </button>
              <span className="quantity-value">{quantity}</span>
              <button className="quantity-btn" onClick={increaseQuantity}>
                +
              </button>
            </div>
          </div>
          <div className="product-stock-cart-size">
            <h2 className="size-header">Size (US)</h2>
            <div className="all-size-configurable">
              <button className="size-button">S</button>
              <button className="size-button">M</button>
              <button className="size-button">L</button>
              <button className="size-button">XL</button>
              <button className="size-button">XXL</button>
            </div>
          </div>
          <div className="product-stock-cart-wishlist">
            {/* <button style={{ marginLeft: "0px" }} className="wishlist-btn">
              WISHLIST
            </button> */}
            <select style={{ marginRight: '0px', border: '2px solid rgb(240,0,0)', fontWeight: 'bolder' }}>
              <option>1 </option>
              <option>2</option>
              <option>3 </option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
            </select>
            <button className="cart-btn" style={{ maxWidth: "2000px" }}>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;

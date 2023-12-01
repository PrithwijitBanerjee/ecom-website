import React, { useState, useEffect } from "react";
import "../../../Css/headerMenu.css";
import { TbGps } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import { Vortex } from "react-loader-spinner";
import HeaderHamburger from "./HeaderHamburger";
import { useDispatch, useSelector } from "react-redux";
import { clearError, handleAsyncMenu } from "../../../Reducers/menuSlice";
import { statusData } from "../../../Reducers/productSlice";
import { RxCross2 } from "react-icons/rx";

const HeaderMenu = () => {
  const [isMobileView, setIsMobileView] = useState(false);
  const [showMiniCart, setShowMiniCart] = useState(false); // State for mini-cart visibility
  const {
    status: loadingStatus,
    items: productItems,
    error,
  } = useSelector((state) => state?.menusData);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleAsyncMenu()); // Async Operation..............
  }, [dispatch]);

  const renderDropdown = (children) => {
    return (
      <ul className="dropdown">
        {children.map((child, idx) => (
          <li key={idx}>
            <a href={`#${child.path}`}>{child.name}</a>
          </li>
        ))}
      </ul>
    );
  };
  useEffect(() => {
    function handleResize() {
      setIsMobileView(window.innerWidth <= 1024); // Adjust the width according to your mobile breakpoint
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleRefresh = () => {
    dispatch(clearError());
    dispatch(handleAsyncMenu());
  };

  // Function to toggle mini-cart visibility
  const toggleMiniCart = () => {
    setShowMiniCart(!showMiniCart);
  };
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
  if (loadingStatus === statusData?.LOADING) {
    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={["red", "green", "blue", "yellow", "orange", "purple"]}
          />
        </div>
      </>
    );
  }
  return (
    <>
      {loadingStatus === statusData?.IDLE && (
        <>
          {isMobileView ? (
            <>
              <HeaderHamburger productItems={productItems} />
            </>
          ) : (
            <header>
              <nav className="navbar">
                <div className="logo desktop-logo desktop-logo-all">
                  <a href="#!" className="anchorLogo">
                    <img
                      src="https://prod.aaw.com/media/logo/stores/4/logo_1.png"
                      title=""
                      alt=""
                      width="170"
                    />
                  </a>
                </div>
                <ul className="navigation">
                  {productItems?.length !== 0 ? (
                    productItems?.map((item) =>{
                      if (item?.children?.length !== 0) {
                        return (
                          <>
                            <li key={item.id.toString()}>
                              <a href="#!">{item?.name}</a>
                              {renderDropdown(item.children)}
                            </li>
                          </>
                        );
                      }
                    })
                  ) : (
                    <Vortex
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="vortex-loading"
                      wrapperStyle={{}}
                      wrapperClass="vortex-wrapper"
                      colors={[
                        "red",
                        "green",
                        "blue",
                        "yellow",
                        "orange",
                        "purple",
                      ]}
                    />
                  )}

                  {/* ... */}
                </ul>
                <ul className="nav-links">
                  {/* Include your desktop menu icons here */}
                  {/* Example placeholders */}
                  <li>
                    <a href="#!">
                      <TbGps size={30} />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <FaHeart size={30} />
                    </a>
                  </li>
                  <li>
                    <a href="#!">
                      <LuUser2 size={30} />
                    </a>
                  </li>
                  <li>
                    <button
                      style={{ color: "black", padding: "0px", margin: "0px" }}
                      onClick={toggleMiniCart}
                    >
                      <BiShoppingBag size={30} />
                    </button>
                  </li>
                </ul>
              </nav>
            </header>
          )}
        </>
      )}
      {/* Mini Cart Sidebar */}
      <div className={`mini-cart-sidebar ${showMiniCart ? "show" : ""}`}>
        <div className="mini-cart-content">
          <div className="my-cart-title">My Cart</div>
          {/* Add your cart items or other content here */}
          {/* ... */}
          <button className="close-button" onClick={toggleMiniCart}>
            <RxCross2 /> {/* Close cross icon */}
          </button>
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;

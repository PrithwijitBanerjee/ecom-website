import React, { useState, useEffect } from "react";
import "../../../Css/headerMenu.css";
import { TbGps } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
// import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { Vortex } from "react-loader-spinner";
import HeaderHamburger from "./HeaderHamburger";

const HeaderMenu = () => {
  const [productItems, setProductItems] = useState([]);
  const [isMobileView, setIsMobileView] = useState(false);
  const Query = `
    {
      categoryList(filters:{ids:{eq:"467"}}){
        uid,
        name,
        id,
        level,
        children_count
        children {
          id
          level
          name
          path
          url_path
          url_key
          image
          description
          children {
            id
            level
            name
            path
            url_path
            url_key
            image
            description
          }
        }
      }
    }`;

  useEffect(() => {
    const handleAsyncData = async () => {
      try {
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: Query }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        const result = await response.json();
        setProductItems(result?.data?.categoryList[0]?.children);
      } catch (error) {
        console.error("Error while fetching data from API:", error.message);
      }
    };

    handleAsyncData(baseUrl);
  }, [Query]); // Include Query as dependency to re-fetch if it changes

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
      setIsMobileView(window.innerWidth <= 768); // Adjust the width according to your mobile breakpoint
    }
    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on mount

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
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
                productItems?.map((item, id) => {
                  if (item?.children?.length !== 0) {
                    return (
                      <>
                        <li key={id}>
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
                <a href="#!">
                  <BiShoppingBag size={30} />
                </a>
              </li>
            </ul>
          </nav>
        </header>
      )}
    </>
  );
};

export default HeaderMenu;

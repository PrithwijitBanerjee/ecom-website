import React, { useState } from "react";
import "../../../Css/headerMenu.css";
import { TbGps } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import axios from "axios";
import { baseUrl } from "../BaseUrl";
import { Vortex } from "react-loader-spinner";
const HeaderMenu = () => {
  const [productItems, setProductItems] = useState([]);
  
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
  React.useEffect(() => {
    const handleAsyncData = async (Url) => {
      try {
        const result = await axios.post(baseUrl, {
          query: Query,
        });
        setProductItems(result?.data?.data?.categoryList[0]?.children); //update the state.....
      } catch (error) {
        console.log("Error while fetching data from API..." + error?.message);
      }
    };

    handleAsyncData(baseUrl);
  }, []); //component did mount....

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

  return (
    <>
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
                colors={["red", "green", "blue", "yellow", "orange", "purple"]}
              />
            )}
          </ul>
          <ul className="nav-links">
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
    </>
  );
};

export default HeaderMenu;

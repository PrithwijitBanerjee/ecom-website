// HeaderHamburger.jsx
// HeaderHamburger.jsx
import React, { useState } from "react";
import { TbGps } from "react-icons/tb";
import { FaHeart } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { BiShoppingBag } from "react-icons/bi";
import "../../../Css/headerHamburger.css"; // Import CSS for styling

const HeaderHamburger = ({ productItems }) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const renderDropdown = (children) => {
    return (
      <ul className="sidebar-dropdown">
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
      <div className="hamburger-menu" onClick={toggleSidebar}>
        ☰ {/* Hamburger icon */}
      </div>
      <div className={`${showSidebar ? "show-sidebar" : "sidebar"}`}>
        <ul className="sidebar-navigation">
          {productItems?.length !== 0 ? (
            productItems?.map((item, id) => {
              if (item?.children?.length !== 0) {
                return (
                  <li key={id}>
                    <a href="#!" onClick={toggleSidebar}>
                      {item?.name}
                    </a>
                    {renderDropdown(item.children)}
                  </li>
                );
              }
            })
          ) : (
            <p>Loading...</p>
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
      </div>
    </>
  );
};

export default HeaderHamburger;

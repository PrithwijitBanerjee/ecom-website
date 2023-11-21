import React from "react";
import "../../../Css/footStyle.css"
import { Link } from "react-router-dom";
const HomeFootLogo = () => {
  return (
    <>
      <Link to={'/productList'}>
        <div className="image-container">
          <img
            className="responsive-image"
            src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-converse-desktop_4.jpg"
            alt=""
          />
        </div>
      </Link>
    </>
  );
};

export default HomeFootLogo;

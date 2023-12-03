import React from "react";
import "../../../Css/productCarousel.css";
import { Link } from "react-router-dom";

const HomeMainLogo = () => {
  return (
    <Link to={'/productList'}>
      <div className="center-image">
        <img
          src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-winter_banner-desktop.jpg"
          alt=""
          className="img-style"
        /><br/>
        <img
          src="https://prod.aaw.com/media/wysiwyg/brands-logo/new-tamara-blk-en.jpg"
          alt=""
          className="img-style"
        />
      </div>
    </Link>
  );
};

export default HomeMainLogo;


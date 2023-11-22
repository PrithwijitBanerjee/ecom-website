import React from "react";
import { Link } from "react-router-dom";
import "../../../Css/homeFooterLogoStyle.css"; // Import your CSS file with the styles mentioned above

const HomeFooterLogo = () => {
  return (
    <>
      <Link to={"/productList"}>
        <div className="footer-style-logo">
          <img
            src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-apparel_01_2.jpg"
            alt=""
            className="dimension"
          />
          <img
            src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-apparel_02_2.jpg"
            alt=""
            className="dimension"
          />
          <img
            src="https://prod.aaw.com/media/weltpixel/owlcarouselslider/images/t/a/taf-apparel_03_2.jpg"
            alt=""
            className="dimension"
          />
        </div>
      </Link>
    </>
  );
};

export default HomeFooterLogo;

import React from "react";
import "../../../Css/footStyle.css";
import { Link } from "react-router-dom";

const HomeLogo = () => {
  return (
    <>
      <Link to={'/productList'}>
        <div className="image-container">
          <img
            src="https://prod.aaw.com/media/wysiwyg/brands-logo/new-tabby-blk-en.jpg"
            alt=""
            className="responsive-image"
          />
        </div>
      </Link>
    </>
  );
};

export default HomeLogo;


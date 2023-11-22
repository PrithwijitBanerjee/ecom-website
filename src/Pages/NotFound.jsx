import React from "react";
import HeaderSearch from "../Components/Cores/CoreHome/HeaderSearch";
import "../Css/notFoundStyle.css"
const NotFound = () => {
  return (
    <div>
      <HeaderSearch />
      <img
        class="img-fluid-responsive"
        src="https://static.aawweb.com/media/wysiwyg/404/404-taf-en_2x.png"
        alt="taf Kuwait" 
      />
    </div>
  );
};

export default NotFound;

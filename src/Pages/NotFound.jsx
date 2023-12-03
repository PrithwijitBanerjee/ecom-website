import React from "react";
import HeaderSearch from "../Components/Cores/CoreHome/HeaderSearch";
import "../Css/notFoundStyle.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (<>
    <div>
      <HeaderSearch />
      <img
        className="img-fluid-responsive"
        src="https://static.aawweb.com/media/wysiwyg/404/404-taf-en_2x.png"
        alt="taf Kuwait"
      />
      <img
        className="img-fluid-responsive"
        src="https://static.aawweb.com/media/wysiwyg/404/404-img_2x.png"
        alt="taf Kuwait"
      />
    </div>
    <div className="home-container">
        <button className="home-button" onClick={()=>navigate('/')}>Go To Home Page</button>
    </div>
  </>
  );
};

export default NotFound;

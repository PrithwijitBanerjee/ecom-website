import React from "react";
import "../../../Css/homeInline.css";
import { useNavigate } from "react-router-dom";
const HomeInline = ({ inlineData }) => {
  const navigate = useNavigate(); // Navigate hook for redirect....
  return (
    <>
      <div className="col-12">
        <h2 class="headline center" style={{ fontWeight: "900px" }}>
          {inlineData}
        </h2>
      </div>
      <div className="button-style">
              <button style={{backgroundColor:'black', color:'white', fontWeight:'bold', borderRadius:'0px'}}
                      onClick={()=>navigate('/productList')}>
                  View More
              </button>
      </div>
    </>
  );
};

export default HomeInline;

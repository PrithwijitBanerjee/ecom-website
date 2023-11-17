import React from "react";
import "../../../Css/homeInline.css";
const HomeInline = ({ inlineData }) => {
  return (
    <>
      <div className="col-12">
        <h2 class="headline center" style={{ fontWeight: "900px" }}>
          {inlineData}
        </h2>
      </div>
      <div className="button-style">
              <button style={{backgroundColor:'black', color:'white', fontWeight:'bold', borderRadius:'0px'}}>
                  View More
              </button>
      </div>
    </>
  );
};

export default HomeInline;

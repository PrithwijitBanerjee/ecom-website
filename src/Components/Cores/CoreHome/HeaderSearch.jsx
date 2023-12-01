import React from "react";
import "../../../Css/headerSearch.css";

const HeaderSearch = () => {
  return (
    <>
      <form className="search-bar">
        <label htmlFor="searchInput" className="search-label">
          What are you looking for?
        </label>
        <div className="search-wrapper">
          <input
            type="text"
            id="searchInput"
            className="search-input"
            placeholder="🔍 Search Entire Store Here..."
          />
        </div>
      </form>
    </>
  );
};

export default HeaderSearch;


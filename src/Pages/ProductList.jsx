import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleProductsData, statusData } from "../Reducers/productSlice";
import HomeFootLogo from "../../src/Components/Cores/CoreHome/HomeFootLogo";
import HeaderSearch from "../../src/Components/Cores/CoreHome/HeaderSearch";
import "../Css/productListStyle.css";
import ReactPaginate from "react-paginate";
import { RxCross2 } from "react-icons/rx";

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state?.products?.productsData);
  const loadingStatus = useSelector((state) => state?.products?.status);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [sortOrder, setSortOrder] = useState("ascending"); // Default sort order
  const [showSkeleton, setShowSkeleton] = useState(true); // State to control skeleton visibility
  const productsPerPage = 6; // Products per page
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    // Simulate loading for a few seconds before displaying content
    const timeout = setTimeout(() => {
      dispatch(handleProductsData());
      setShowSkeleton(false);
    }, 2000); // Adjust the delay as needed (2 seconds in this case)

    return () => clearTimeout(timeout);
  }, [dispatch]);

  if (loadingStatus === statusData?.ERROR) {
    return (
      <div className="product-list-container">
        <h1>Something Went Wrong With API...</h1>
      </div>
    );
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  if (loadingStatus === statusData?.LOADING || showSkeleton || !allProducts) {
    // Placeholder for loading state (skeleton loader)
    const skeletonItems = Array.from(
      { length: productsPerPage },
      (_, index) => (
        <div key={index} className="skeleton-product-card">
          <div className="skeleton-product-image"></div>
          <div className="skeleton-product-details">
            <div className="skeleton-product-name"></div>
            <div className="skeleton-product-description"></div>
            <div className="skeleton-product-price"></div>
          </div>
        </div>
      )
    );

    return (
      <div className="product-list-container">
        <HeaderSearch />
        <HomeFootLogo />
        <div className="product-container">{skeletonItems}</div>
      </div>
    );
  }

  // Sorting logic based on the selected sort order
  const sortedProducts = [...allProducts].sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (sortOrder === "ascending") {
      return nameA.localeCompare(nameB);
    } else {
      return nameB.localeCompare(nameA);
    }
  });

  // Logic to paginate the sorted products
  const offset = currentPage * productsPerPage;
  const currentPageData = sortedProducts.slice(
    offset,
    offset + productsPerPage
  );

  const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0); // Reset current page on sort change
  };

  return (
    <div className="product-list-container">
      <HomeFootLogo />
      <div className="sort-by">
        <label htmlFor="sort-select">Sort by:</label>
        <select id="sort-select" value={sortOrder} onChange={handleSortChange}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
      <div className="filter-product-style">
        <button className="filter-button" onClick={toggleSidebar}>
          Filter
        </button>
        {/* Sidebar */}
        <div className={`sidebar ${showSidebar ? "show" : ""}`}>
          <div className="sidebar-header">
            <button className="close-btn1" onClick={closeSidebar}>
            <RxCross2 /> {/* Close cross icon */}
            </button>
          </div>
          <div className="sidebar-content">
            <h2>Filter & Sort</h2>
            {/* Add your filter options or content here */}
          </div>
        </div>
        <div className="product-container">
          {currentPageData.map((product) => (
            <div key={product?.id} className="product-cards">
              <img
                src={product?.image?.url}
                alt={product?.name}
                className="product-image"
              />
              <h3 className="product-name">{product?.name}</h3>
              <p className="product-description">{product?.sku}</p>
              <span className="product-price">
                {product?.price?.regularPrice?.amount?.currency}
                {product?.price?.regularPrice?.amount?.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default ProductList;

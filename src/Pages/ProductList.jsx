import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, handleProductsData, statusData } from "../Reducers/productSlice";
import HomeFootLogo from "../../src/Components/Cores/CoreHome/HomeFootLogo";
import HeaderSearch from "../../src/Components/Cores/CoreHome/HeaderSearch";
import "../Css/productListStyle.css";
import ReactPaginate from "react-paginate";
import { RxCross2 } from "react-icons/rx";
import { fetchProductsAsync } from "../Reducers/filterSalarySlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state?.products?.productsData);
  const priceFilter = useSelector((state) => state?.filterPriceProducts?.items); // Get the price filter state
  const loadingStatus = useSelector((state) => state?.products?.status);
  // const error = useSelector(state => state?.products?.error);
  const [currentPage, setCurrentPage] = useState(0); // Current page number
  const [sortOrder, setSortOrder] = useState("ascending"); // Default sort order
  const [showSkeleton, setShowSkeleton] = useState(true); // State to control skeleton visibility
  const productsPerPage = 6; // Products per page
  const [showSidebar, setShowSidebar] = useState(false);
  const [showPriceSection, setShowPriceSection] = useState(false);
  const [showGenderSection, setShowGenderSection] = useState(false);
  const [showBrandSection, setShowBrandSection] = useState(false);
  // const [price, setPrice] = useState(0); // state for price slider....
  const minPrice = 0;
  const maxPrice = 1000;

  // Calculate the initial price as the midpoint between minPrice and maxPrice
  const initialPrice = (minPrice + maxPrice) / 2;
  const [priceRange, setPriceRange] = useState({ low: 50, high: initialPrice }); //state for price slider

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
      <div className="product-list-container error-container">
        <div className="error-content">
          <h2>An error occurred to load data! Check your Api connection</h2>
        </div>
        <button className="retry-button" onClick={handleRefresh}>Retry</button>
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


  // Sorting logic for priceFilter
  const sortedPriceFilter = [...priceFilter].sort((a, b) => {
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


  // Pagination logic for the priceFilter
  const priceFilterOffset = currentPage * productsPerPage;
  const priceFilterPaginatedData = sortedPriceFilter.slice(
    priceFilterOffset,
    priceFilterOffset + productsPerPage
  );
  const priceFilterPageCount = Math.ceil(sortedPriceFilter.length / productsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(0); // Reset current page on sort change
  };

  const togglePriceSection = () => { //Toggles the Price section inside the filter sidebar
    setShowPriceSection(!showPriceSection);
    const dropdownButton = document.querySelector(".dropdown-btn");
    dropdownButton.classList.toggle("expanded");
  };

  const toggleGenderSection = () => {  //Toggles the Price section inside the filter sidebar
    setShowGenderSection(!showGenderSection);
    const genderBtn = document.querySelector(".gender-btn");
    genderBtn.classList.toggle("expanded");
  };

  const toggleBrandSection = () => {
    setShowBrandSection(!showBrandSection);
    const brandBtn = document.querySelector(".brand-btn");
    brandBtn.classList.toggle("expanded");
  };

  const handlePriceChange = (e) => {
    const { value } = e.target;
    const newHigh = parseInt(value);
    setPriceRange((prevState) => ({
      ...prevState,
      high: newHigh,
      low: newHigh > prevState.low ? prevState.low : newHigh - 50, // Adjust the low value based on the range
    }));
    dispatch(fetchProductsAsync({ fromValue: priceRange.low, toValue: newHigh }));
  };

  function handleRefresh() {
    dispatch(clearError());
    dispatch(handleProductsData());
  }
  return (
    <>
      {
        loadingStatus === statusData?.IDLE && (
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
                  <h3>Filter & Sort</h3>
                  {/* Add your filter options or content here */}
                  <button onClick={togglePriceSection} className="dropdown-btn">
                    Price
                  </button>
                  {showPriceSection && (
                    <div className="price-slider">
                      <p className="slider-output">KD {priceRange.low} - KD {priceRange.high}</p>
                      <div className="slider-container">
                        <input
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange.high}
                          step="10"
                          className="slider"
                          onChange={handlePriceChange}
                        />
                      </div>
                    </div>
                  )}
                  {/* Gender foldable section */}
                  <button onClick={toggleGenderSection} className="dropdown-btn gender-btn">
                    Gender
                  </button>
                  {showGenderSection && (
                    <div className="gender-section">
                      <div className="sub-gender-section">
                        <input type='checkbox' name="men" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Men</a><br />
                        <input type="checkbox" name="women" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Women</a> <br />
                        <input type="checkbox" name="kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Kids</a><br />
                        <input type="checkbox" name="girls" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Girls</a> <br />
                        <input type="checkbox" name="boys" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Boys</a> <br />
                        <input type="checkbox" name="unisex_kids" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex Kid</a>s <br />
                        <input type="checkbox" name="unisex" className="gender-input" /><a style={{ textDecoration: 'none', color: 'black' }} href="#!">Unisex</a> <br />
                      </div>
                    </div>
                  )}
                  <button onClick={toggleBrandSection} className="dropdown-btn brand-btn">
                    Brands
                  </button>
                  {showBrandSection && (
                    <div className="brand-section">
                      {/* Add your Brands content or filter options here */}
                      {/* Example checkbox list */}
                      <div className="sub-brand-section">
                        <a style={{ textDecoration: 'none', color: 'black' }} href="#!">Milton</a><br />
                        <a style={{ textDecoration: 'none', color: 'black' }} href="#!">Treo</a> <br />
                        <a style={{ textDecoration: 'none', color: 'black' }} href="#!">Procook</a> <br />
                        <a style={{ textDecoration: 'none', color: 'black' }} href="#!">Spotzero</a> <br />

                        {/* Add more brands as needed */}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="product-container">
                {/* Displaying either currentPageData or priceFilter based on conditions */}
                {priceFilter && priceFilter?.length !== 0 ? (<>
                  {
                    priceFilterPaginatedData?.map(product => {
                      return (<>
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
                      </>);
                    })
                  }
                </>) : (<>
                  {
                    (currentPageData?.length !== 0) ? <>
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
                    </> : ''
                  }
                </>)}
                {/* Skeleton loader for the current displayed data */}
                {(loadingStatus === statusData?.LOADING || showSkeleton) &&
                  Array.from({ length: productsPerPage }, (_, index) => (
                    <div key={index} className="skeleton-product-card">
                      {/* Skeleton loader elements for the current displayed data */}
                      <div className="skeleton-product-image"></div>
                      <div className="skeleton-product-details">
                        <div className="skeleton-product-name"></div>
                        <div className="skeleton-product-description"></div>
                        <div className="skeleton-product-price"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            {loadingStatus === statusData?.LOADING && priceFilter?.length === 0 && (
              <div className="product-container">
                {Array.from({ length: productsPerPage }, (_, index) => (
                  <div key={`skeleton-filter-${index}`} className="skeleton-product-card">
                    {/* Skeleton loader elements for the priceFilter */}
                    <div className="skeleton-product-image"></div>
                    <div className="skeleton-product-details">
                      <div className="skeleton-product-name"></div>
                      <div className="skeleton-product-description"></div>
                      <div className="skeleton-product-price"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {/* Pagination based on either currentPageData or priceFilter */}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              pageCount={priceFilter?.length !== 0 ? priceFilterPageCount : pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        )
      }
    </>
  );
};

export default ProductList;

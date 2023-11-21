import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleProductsData, statusData } from '../Reducers/productSlice';
import HomeFootLogo from '../../src/Components/Cores/CoreHome/HomeFootLogo';
import HeaderSearch from '../../src/Components/Cores/CoreHome/HeaderSearch';
import "../Css/productListStyle.css";
import ReactPaginate from 'react-paginate';

const ProductList = () => {
    const dispatch = useDispatch();
    const allProducts = useSelector(state => state?.products?.productsData);
    const loadingStatus = useSelector(state => state?.products?.status);
    const [currentPage, setCurrentPage] = useState(0); // Current page number
    const [sortOrder, setSortOrder] = useState('ascending'); // Default sort order
    const [showSkeleton, setShowSkeleton] = useState(true); // State to control skeleton visibility
    const productsPerPage = 6; // Products per page
    const [selectedPriceFilter, setSelectedPriceFilter] = useState('');
    const [selectedGenderFilter, setSelectedGenderFilter] = useState('');
    const [selectedDepartmentFilter, setSelectedDepartmentFilter] = useState('');
    const [selectedFootwearSizeFilter, setSelectedFootwearSizeFilter] = useState('');
    const [selectedClothingSizeFilter, setSelectedClothingSizeFilter] = useState('');
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
            <div className='product-list-container'>
                <h1>Something Went Wrong With API...</h1>
            </div>
        );
    }



    // Function to filter products based on selected filters
    const filterProducts = () => {
        let filteredProducts = [...allProducts];

        if (selectedPriceFilter) {
            // Filter logic for price
            // Modify filteredProducts accordingly
        }
        if (selectedGenderFilter) {
            // Filter logic for gender
            // Modify filteredProducts accordingly
        }
        if (selectedDepartmentFilter) {
            // Filter logic for department
            // Modify filteredProducts accordingly
        }
        if (selectedFootwearSizeFilter) {
            // Filter logic for footwear size
            // Modify filteredProducts accordingly
        }
        if (selectedClothingSizeFilter) {
            // Filter logic for clothing size
            // Modify filteredProducts accordingly
        }

        return filteredProducts;
    };

    const filteredProducts = filterProducts();

    const sortedFilteredProducts = [...filteredProducts].sort((a, b) => {
        // Sorting logic based on selected sort order
        // Similar to previous sorting logic
    });



    if (loadingStatus === statusData?.LOADING || showSkeleton || !allProducts) {
        // Placeholder for loading state (skeleton loader)
        const skeletonItems = Array.from({ length: productsPerPage }, (_, index) => (
            <div key={index} className="skeleton-product-card">
                <div className="skeleton-product-image"></div>
                <div className="skeleton-product-details">
                    <div className="skeleton-product-name"></div>
                    <div className="skeleton-product-description"></div>
                    <div className="skeleton-product-price"></div>
                </div>
            </div>
        ));

        return (
            <div className='product-list-container'>
                <HeaderSearch />
                <HomeFootLogo />
                <div className="product-container">
                    {skeletonItems}
                </div>
            </div>
        );
    }

    // Sorting logic based on the selected sort order
    const sortedProducts = [...allProducts].sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (sortOrder === 'ascending') {
            return nameA.localeCompare(nameB);
        } else {
            return nameB.localeCompare(nameA);
        }
    });

    // Logic to paginate the sorted products
    const offset = currentPage * productsPerPage;
    const currentPageData = sortedProducts.slice(offset, offset + productsPerPage);

    const pageCount = Math.ceil(sortedProducts.length / productsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
        setCurrentPage(0); // Reset current page on sort change
    };

    const handlePriceFilterChange = (e) => {
        setSelectedPriceFilter(e.target.value);
        setCurrentPage(0);
    };

    const handleGenderFilterChange = (e) => {
        setSelectedGenderFilter(e.target.value);
        setCurrentPage(0);
    };

    const handleDepartmentFilterChange = (e) => {
        setSelectedDepartmentFilter(e.target.value);
        setCurrentPage(0);
    };

    const handleFootwearSizeFilterChange = (e) => {
        setSelectedFootwearSizeFilter(e.target.value);
        setCurrentPage(0);
    };

    const handleClothingSizeFilterChange = (e) => {
        setSelectedClothingSizeFilter(e.target.value);
        setCurrentPage(0);
    };

    return (
        <div className='product-list-container'>
            <HomeFootLogo />
            <div className="sort-by">
                <label htmlFor="sort-select">Sort by:</label>
                <select id="sort-select" value={sortOrder} onChange={handleSortChange}>
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>
            </div>
            <div className='filter-product-style'>
                <div className="filter-section">
                    <div className="filter-by-price">
                        {/* Dropdown for price filter */}
                        <label htmlFor='price'>Price</label>
                        <select id='price' value={selectedPriceFilter} onChange={handlePriceFilterChange}>
                            {/* Options for price filter */}
                        </select>
                    </div>
                    <div className="filter-by-gender">
                        <label htmlFor='gender'>Gender</label>
                        {/* Dropdown for gender filter */}
                        <select id='gender' value={selectedGenderFilter} onChange={handleGenderFilterChange}>
                            {/* Options for gender filter */}
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="filter-by-department">
                        <label htmlFor='department'>Department</label>
                        {/* Dropdown for department filter */}
                        <select id='department' value={selectedDepartmentFilter} onChange={handleDepartmentFilterChange}>
                            {/* Options for department filter */}
                            <option>Footwear</option>
                            <option>Apparal</option>
                        </select>
                    </div>
                    <div className="filter-by-footwear-size">
                        <label htmlFor='footwear'>Footwear Sizes</label>
                        {/* Dropdown for footwear size filter */}
                        <select id='footwear' value={selectedFootwearSizeFilter} onChange={handleFootwearSizeFilterChange}>
                            {/* Options for footwear size filter */}
                        </select>
                    </div>
                    <div className="filter-by-clothing-size">
                    <label htmlFor='clothing'>Clothing Sizes</label>
                        {/* Dropdown for clothing size filter */}
                        <select id='clothing' value={selectedClothingSizeFilter} onChange={handleClothingSizeFilterChange}>
                            {/* Options for clothing size filter */}
                        </select>
                    </div>
                </div>
                <div className="product-container">
                    {currentPageData.map((product) => (
                        <div key={product?.id} className="product-cards">
                            <img src={product?.image?.url} alt={product?.name} className="product-image" />
                            <h3 className="product-name">{product?.name}</h3>
                            <p className="product-description">{product?.sku}</p>
                            <span className="product-price">{product?.price?.regularPrice?.amount?.currency}{product?.price?.regularPrice?.amount?.value}</span>
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

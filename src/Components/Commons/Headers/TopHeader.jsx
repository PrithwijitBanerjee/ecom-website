import React from 'react'
import "../../../Css/topHeader.css"
const TopHeader = () => {
    const wpxLink = {
        color: '#fff',
        fontWeight: "400",
        textDecoration: 'none',
        padding: '3px 15px',
        border: '1px solid #fff',
        borderRadius: "3px",
        cursor: 'pointer',
    }
    return (
        <>
            {/* Top Header Section */}
            <div className='top-header-promo res-grid'>
                <div className='quotecontainer' style={{ backgroundColor: 'red', padding: '15px 5px 15px' }}>
                    <span className="wpx-sub">Same Day Delivery in Kuwait | Order before 1PM to receive your order today! &nbsp;</span>
                    <a href="https://www.theathletesfoot.com.kw/delivery-information" style={wpxLink}>SHOP NOW!</a>
                </div>
            </div>
            <div className='image-container res-grid'>
                    <img src="https://static.aawweb.com/static/version2023111401/frontend/MageSuper/taf/en_US/WeltPixel_Multistore/images/inactive_placeholder.svg" width={60} height={50} alt="TAF العربية"/>
            </div>        
        </>
    )
}

export default TopHeader
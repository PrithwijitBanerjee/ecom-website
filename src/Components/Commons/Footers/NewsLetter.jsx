import React from "react";
import "../../../Css/newsletterStyle.css";
const NewsLetter = () => {
  return (
    <>
      <footer className="footerNews">
        <div className="containerNews">
          <div className="newsletter">
            <div className="newsletter-content">
              <h1 className="newsletter-heading" style={{ marginRight: '40px', textAlign:'left', fontFamily:'monospace'}}>Subscribe To Our Newsletter</h1>
              <h4 className="newsletter-data" style={{fontFamily:'sans-serif'}}>Offers And Promotions Before Everyone Else, But Also Advice And Ideas For All Your Desires.</h4>
            </div>
            <form className="subscribe-form">
              <input className="input-field" type="email" placeholder="Enter your email address" required style={{ borderRadius: '20px', width: '169%' }} />
              <button className="newsButton" type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NewsLetter;

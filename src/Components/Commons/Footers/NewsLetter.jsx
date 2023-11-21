import React from "react";
import "../../../Css/newsletterStyle.css";
const NewsLetter = () => {
  return (
    <>
        <footer className="footerNews">
          <div className="containerNews">
            <div className="newsletter">
              <h2 className="newsletter-heading" style={{marginRight:'40px'}}>Subscribe To Our Newsletter</h2>
              <form className="subscribe-form">
                <input className="input-field" type="email" placeholder="Enter your email address" required style={{borderRadius:'20px',width:'400px'}}/>
                <button type="submit">Subscribe</button>
              </form>
            </div>
          </div>
        </footer>
    </>
  );
};

export default NewsLetter;

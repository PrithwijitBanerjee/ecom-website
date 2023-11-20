import React from "react";
import "../../../Css/footerLinks.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
const FooterLinks = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>COMPANY</h4>
              <ul>
                <li>
                  <a href="#!">about us</a>
                </li>
                <li>
                  <a href="#!!">our services</a>
                </li>
                <li>
                  <a href="#!">privacy policy</a>
                </li>
                <li>
                  <a href="#!">affiliate program</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>NEED HELP?</h4>
              <ul>
                <li>
                  <a href="#!">FAQ</a>
                </li>
                <li>
                  <a href="#!">shipping</a>
                </li>
                <li>
                  <a href="#!">returns</a>
                </li>
                <li>
                  <a href="#!">order status</a>
                </li>
                <li>
                  <a href="#!">payment options</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>INFORMATION</h4>
              <ul>
                <li>
                  <a href="#!">watch</a>
                </li>
                <li>
                  <a href="#!">bag</a>
                </li>
                <li>
                  <a href="#!">shoes</a>
                </li>
                <li>
                  <a href="#!">dress</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>BECOME A FAN NOW</h4>
              <div className="social-links">
                <div className="social-icons">
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a
                    href="https://twitter.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="https://skype.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-skype"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterLinks;

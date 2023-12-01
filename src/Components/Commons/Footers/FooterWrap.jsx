import React from "react";
import FooterLinks from "./FooterLinks";
import NewsLetter from "./NewsLetter";
import Copyright from "./Copyright";

const FooterWrap = () => {
  return (
    <>
      <NewsLetter />
      <FooterLinks />
      <Copyright/>
    </>
  );
};

export default FooterWrap;

import FooterWrap from "./Components/Commons/Footers/FooterWrap";
import HeaderMain from "./Components/Commons/Headers/HeaderMain";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import NotFound from "./Pages/NotFound";
import { useEffect, useState } from "react";
// import Offline from './Pages/Offline.jsx';
function App() {
  const [status, setStatus] = useState('');
  useEffect(()=>{
    
    if (navigator.onLine) {
      console.log("online");
    } else {
      console.log("offline");
    }
  },[]);
  return (
    <>
      <Router>
        <HeaderMain />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/productList" element={<ProductList/>} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <FooterWrap/>
      </Router>
    </>
  );
}

export default App;

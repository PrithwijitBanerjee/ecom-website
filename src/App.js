import FooterWrap from "./Components/Commons/Footers/FooterWrap";
import HeaderMain from "./Components/Commons/Headers/HeaderMain";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import NotFound from "./Pages/NotFound";
function App() {
  return (
    <>
      <Router>
        <HeaderMain />
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <FooterWrap/>
      </Router>
    </>
  );
}

export default App;

import FooterWrap from "./Components/Commons/Footers/FooterWrap";
import HeaderMain from "./Components/Commons/Headers/HeaderMain";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import NotFound from "./Pages/NotFound";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Offline from './Pages/Offline'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [status, setStatus] = useState(!navigator.onLine);
  const [msg, setMsg] = useState('');

  useEffect(() => {

    if(navigator.onLine) // After first time renders...
    {
      setStatus(false);
      setMsg('You are Online and Connected with Internet');
    }
    const onlineHandler = () => {
      setStatus(false);
      setMsg('You are Online and Connected with Internet');
      toast.success('You are Online and Connected With Internet', {
        theme: 'colored',
        autoClose: 5000,
      });
    };

    const offlineHandler = () => {
      setStatus(true);
      setMsg('You are Offline and Please Check Your Internet');
      toast.error('You are Offline and Please Check Your Internet', {
        theme: 'colored',
        autoClose: 5000,
      });
    };

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <HeaderMain />
        <Routes>
          <Route
            path="/"
            element={status ? <Offline/> : <Home />}
          />
          <Route
            path="/productList"
            element={status ? <Offline/> : <ProductList />}
          />
          {/* Add other routes similarly */}
          <Route
            path="*"
            element={status ? <Offline/> : <NotFound />}
          />
        </Routes>
        <FooterWrap />
      </Router>
    </>
  );
}

export default App;

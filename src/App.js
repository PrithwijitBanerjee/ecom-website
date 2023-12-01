import FooterWrap from "./Components/Commons/Footers/FooterWrap";
import HeaderMain from "./Components/Commons/Headers/HeaderMain";
import Home from "./Pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";
import NotFound from "./Pages/NotFound";
import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
import Offline from "./Pages/Offline";
// import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./Pages/ProductDetail";

function App() {
  const [status, setStatus] = useState(!navigator.onLine);
  const [msg, setMsg] = useState("");

  const showToast = (message, type) => {
    const toastContainer = document.createElement("div");
    toastContainer.className = `notification ${type}`;
    toastContainer.textContent = message;
    document.body.appendChild(toastContainer);

    setTimeout(() => {
      toastContainer.classList.add("hide"); // Trigger hide animation
      setTimeout(() => {
        document.body.removeChild(toastContainer);
      }, 500); // Remove the notification after the animation ends
    }, 5000);
  };

  useEffect(() => {
    if (navigator.onLine) {
      // After first time renders...
      setStatus(false);
      setMsg("You are Online and Connected with Internet");
    }
    const onlineHandler = () => {
      setStatus(false);
      setMsg("You are Online and Connected with Internet");
      showToast("You are Online and Connected With Internet", "success");
    };

    const offlineHandler = () => {
      setStatus(true);
      setMsg("You are Offline and Please Check Your Internet");
      showToast("You are Offline and Please Check Your Internet", "error");
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    //Clean Up Function..........
    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, []);

  const OfflineCheck = ({ children }) => {
    //Higher Order Component.......
    if (status) {
      return (
        <>
          <Offline />
        </>
      );
    }
    if (status === false) {
      return <>{children}</>;
    }
  };
  const AllComponents = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/productList",
      component: <ProductList />,
    },
    {
      path: "/productDetail/:key",
      component: <ProductDetail />,
    },
    {
      path: "*",
      component: <NotFound />,
    },
  ];
  return (
    <>
      <Router>
        <HeaderMain />
        <Routes>
          {AllComponents.map((component,index) => {
            return (
              <>
                <Route
                  key={index+1}
                  path={component?.path}
                  element={<OfflineCheck>{component?.component}</OfflineCheck>}
                />
              </>
            );
          })}
        </Routes>
        <FooterWrap />
      </Router>
    </>
  );
}

export default App;

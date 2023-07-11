import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setdataproduct } from "./redux/productslice";
import Header from "./Component/Header";
import Menu from "./Component/Menu";
import About from "./Component/About";
import Contact from "./Component/Contact";
import Newproduct from "./Component/Newproduct";
import Logins from "./Component/Logins";
import Signups from "./Component/Signups";
import Home from "./Component/Home";
import Cart from "./Component/Cart";
import Success from "./Component/Success";
import Cancel from "./Component/Cancel";

function App() {
  const dispatch = useDispatch();
  const productdata = useSelector((state) => state.product);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/product");
        const data = await res.json();
        dispatch(setdataproduct(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div style={{ backgroundColor: "#18191a" }} className="text-white">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu/:filterby" element={<Menu />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Logins />} />
              <Route path="/uploadproduct" element={<Newproduct />} />
              <Route path="/signup" element={<Signups />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

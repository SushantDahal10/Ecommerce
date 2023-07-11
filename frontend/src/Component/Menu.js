import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Allproduct from "./Allproduct";

import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/productslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Menu() {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleaddproductcart = (e) => {
    if (userData.email) {
      toast.success("Product added to cart", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      dispatch(addCartItem(productdisplay));
      // Redirect to the cart page or any other desired page
    } else {
      toast.error("please login first ", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
      navigate("/login");
    }
  };

  const { filterby } = useParams();
  const productdata = useSelector((state) => state.product.productlist);
  console.log(productdata);

  const productdisplay = productdata.find((el) => el._id === filterby);

  if (!productdisplay) {
    // Handle the case when the product is not found
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <div className="py-10 relative top-10 p-3 md:p-9 text-white">
        <div className="w-full max-w-4xl shadow-md  m-auto md:flex gap-11 mt-5">
          <div className="max-w-sm  overflow-hidden  w-full mt-4 mx-auto ">
            <img
              src={productdisplay.image}
              className="hover:scale-105 transition-all"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold capitalize text-2xl md:text-4xl">
              {productdisplay.name}
            </h3>
            <p className="text-slate-500 font-medium">
              {productdisplay.category}
            </p>
            <p className="font-bold">
              <span className="text-red-500">रु</span>
              &nbsp;
              <span>{productdisplay.price}</span>
            </p>
            <div className="flex gap-3">
              <button
                style={{ backgroundColor: "#1877F2" }}
                className=" my-1 rounded  hover:bg-yellow-600 px-3 py-2 min-2-[100px] "
                onClick={handleaddproductcart}
              >
                Add to Cart
              </button>
            </div>
            <p className="text-slate-600 font-medium py-2 ">Description:</p>
            <ul>
              <li>
                {" "}
                <p>{productdisplay.description}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional content */}
        <Allproduct heading="Our Products " />
      </div>
      <ToastContainer />
    </div>
  );
}

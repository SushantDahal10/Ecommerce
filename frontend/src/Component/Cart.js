import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Cartdisplayproduct from "./Cartdisplayproduct";
import { Link } from "react-router-dom";
import "./darktheme.css";
import { loadStripe } from "@stripe/stripe-js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emptyCart } from "../redux/productslice";

export default function Cart() {
  console.log(process.env.REACT_APP_STRIPE);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.product.CartItem);
  const totalPrice = cartItems.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQty = cartItems.reduce((acc, curr) => acc + parseInt(curr.qty), 0);
  const handleClearCart = () => {
    toast.info("Cart cleared", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800,
    });
    dispatch(emptyCart());
  };

  const handlePayment = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItems),
        }
      );

      if (res.ok) {
        toast.success("Redirecting to payment gateway....", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
      }
      if (!res.ok) {
        throw new Error("Error creating checkout session");
      }

      const { sessionId } = await res.json(); // Extract sessionId from the response

      const stripe = await loadStripe(process.env.REACT_APP_STRIPE);

      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Could not redirect", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
      // Handle the error and display an appropriate message to the user
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="py-10 px-3 md:px-9">
        <h2 className="text-lg font-bold text-white text-center mt-5 mb-5">
          Your Cart Items
        </h2>
        {cartItems.length ? (
          <>
            <button
              className="bg-red-500 text-lg w-1/2 font-bold py-2 px-1 text-white mx-auto"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <ToastContainer />
          </>
        ) : (
          ""
        )}

        {cartItems.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Display cart items */}
            <div className="col-span-2">
              {cartItems.map((item) => (
                <Cartdisplayproduct
                  key={item._id}
                  id={item._id}
                  price={item.price}
                  name={item.name}
                  image={item.image}
                  category={item.category}
                  qty={item.qty}
                  total={item.total}
                  description={item.description}
                />
              ))}
            </div>
            {/* Total cart items */}
            <div className="col-span-1">
              <h2 className="bg-blue-500 text-white p-2 text-lg">Summary</h2>
              <div className="flex justify-between py-2 text-lg border-b">
                <p>Total Qty:</p>
                <p className="font-bold">{totalQty}</p>
              </div>
              <div className="flex justify-between py-2 text-lg border-b">
                <p>Total Price:</p>
                <p className="font-bold text-red-500">रु&nbsp;{totalPrice}</p>
              </div>
              <button
                className="bg-red-500 text-lg w-full font-bold py-2 px-1 text-white mt-4"
                onClick={handlePayment}
              >
                Payment
              </button>
              <ToastContainer />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-center text-red-500 font-bold text-2xl mb-4">
              Empty
            </p>
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.tOiAM6Db5acOOVS2wA_MRQHaHv&pid=Api&P=0&h=180"
              className="w-1/2 sm:w-1/5"
              alt=""
            />
            <Link exact to="/" className="text-red-500 font-bold text-xl mt-5">
              <button
                type="submit"
                className="w-full max-w-[120px] bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 cursor-pointer text-xl font-medium"
              >
                Go to Home
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

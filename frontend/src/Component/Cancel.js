import React, { useEffect } from "react";
import { emptyCart } from "../redux/productslice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./darktheme.css";
export default function Success() {
  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(emptyCart());
  };

  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="py-10 px-3 md:px-9 w-full max-w-md mx-auto">
        <div className="bg-red-400 h-36 flex justify-center items-center">
          <h1 className="text-white text-5xl font-bold">
            Payment unsuccessful
          </h1>
        </div>
        <div className="flex justify-center mt-4">
          <Link exact to="/" className="text-red-500 font-bold text-xl">
            <button
              type="submit"
              onClick={handleHome}
              className="w-full max-w-[120px] bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 cursor-pointer text-xl font-medium"
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

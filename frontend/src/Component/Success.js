import React, { useEffect } from "react";
import { emptyCart } from "../redux/productslice";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Success() {
  const dispatch = useDispatch();

  const handleHome = () => {
    dispatch(emptyCart());
  };

  useEffect(() => {
    dispatch(emptyCart());
  }, [dispatch]);

  return (
    <div
      className="min-h-screen flex items-center justify-center "
      style={{ backgroundColor: "#18191a" }}
    >
      <div className="py-10 relative top-10 p-3 md:p-9">
        <div className="bg-green-200 w-full max-w-md m-auto h-36 flex justify-center items-center font-semibold">
          <h1>
            <p className="text-white text-5xl font-bold">Payment Successful</p>
          </h1>
        </div>
        <div className="flex justify-center">
          <Link exact to="/" className="text-red-500 font-bold text-xl mt-2">
            <button
              type="submit"
              onClick={handleHome}
              className="max-w-[120px] w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md h-10 cursor-pointer text-xl font-medium mt-2"
            >
              Go to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

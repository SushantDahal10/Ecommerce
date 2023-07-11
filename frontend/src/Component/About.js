import React from "react";
import { Link } from "react-router-dom";
import "./darktheme.css";
export default function About() {
  return (
    <div
      className="min-h-screen py-5 text-white"
      style={{ backgroundColor: "#18191a" }}
    >
      <div className="flex items-center justify-center">
        <div className="py-9 mb-5">
          <div className="flex flex-col justify-center max-w-4xl mx-auto px-5 py-5 shadow-md rounded-md gap-3">
            <h1 className="text-5xl font-bold text-red-500 hover:text-red-600 text-center mb-5">
              About Us:
            </h1>
            <p className="text-lg text-white">
              At Nepal Technology, we specialize in providing the best selection
              of high-quality laptops at affordable prices. Our mission is to
              make it easy for customers to find the perfect laptop that suits
              their needs and budget. With a wide range of brands, models, and
              configurations available, we offer a diverse collection of laptops
              for various purposes, including work, gaming, and entertainment.
            </p>
          </div>
          <div className="flex flex-col justify-center items-center mt-5">
            <img
              src="https://cdn.shopify.com/s/files/1/0015/1129/2989/files/662-1_2000x.progressive.jpg?v=1598680425"
              className="w-full max-w-md rounded-md object-cover"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          exact
          to="/contact"
          className="text-red-500 font-bold text-xl mt-2"
        >
          <button
            type="submit"
            className="w-full max-w-[120px] bg-blue-500 text-white hover:bg-blue-600 rounded-md h-10 cursor-pointer text-xl font-medium mt-2"
          >
            Contact Us
          </button>
        </Link>
      </div>
    </div>
  );
}

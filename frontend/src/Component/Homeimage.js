import React from "react";
import { Link } from "react-router-dom";
export default function Homeimage({ name, image, category, price, id }) {
  return (
    <div className=" shadow-md rounded p-2">
      {image && (
        <>
          <Link exact to={`/menu/${id}`}>
            <div className="w-40 min-h-[150px]">
              <img src={image} alt="oop" className="h-full w-full" />
            </div>
            <h3 className="font-semibold text-slate-500 text-center capitalize text-lg">
              {name}
            </h3>
            <p className="text-center text-slate-500 font-medium">{category}</p>
            <p>
              <span className="text-red-800">रु</span>
              <span className="text-center font-bold ">{price}</span>
            </p>
          </Link>
        </>
      )}
    </div>
  );
}

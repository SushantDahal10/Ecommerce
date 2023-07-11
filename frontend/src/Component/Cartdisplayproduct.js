import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  increaseqty,
  decreaseqty,
} from "../redux/productslice";

export default function Cartdisplayproduct({
  id,
  name,
  price,
  image,
  category,
  total,
  qty,
  description,
}) {
  const dispatch = useDispatch();

  return (
    <div className="text-white p-2 flex flex-col md:flex-row gap-5 rounded border border-slate-300">
      <div className="p-3 bg-white rounded overflow-hidden flex justify-center items-center">
        <img src={image} alt="" className="h-28 w-40 object-cover" />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold capitalize text-lg md:text-2xl">
            {name}
          </h3>
          <div
            style={{ backgroundColor: "#1877F2" }}
            className="text-2xl text-white cursor-pointer hover:text-red-500"
            onClick={() => dispatch(deleteCartItem(id))}
          >
            <MdDelete />
          </div>
        </div>
        <p className="text-white font-medium">{category}</p>
        <p className="font-bold text-base">
          <span className="text-red-500">रु</span>&nbsp;
          <span className="text-white">{price}</span>
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              className="bg-slate-400 rounded hover:bg-slate-500 px-3 py-2"
              onClick={() => {
                dispatch(increaseqty(id));
              }}
            >
              <AiOutlinePlus />
            </button>
            <p className="font-semibold text-md p-2">{qty}</p>
            <button
              className="bg-slate-400 rounded hover:bg-slate-500 px-3 py-2"
              onClick={() => {
                dispatch(decreaseqty(id));
              }}
            >
              <AiOutlineMinus />
            </button>
          </div>
          <div className="flex items-center gap-2 font-bold text-slate-800">
            <p className="text-white">
              Total: <span className="text-red-500">रु</span>
            </p>
            <p className="text-white">{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

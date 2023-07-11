import React, { useEffect, useState } from "react";
import Filterproduct from "./Filterproduct";
import Cartfeature from "./Cartfeature";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductList } from "../redux/productslice";
import "./darktheme.css";
export default function Allproduct({ heading }) {
  const dispatch = useDispatch();
  const productdata = useSelector((state) => state.product.productlist);
  const categorylist = [...new Set(productdata.map((el) => el.category))];
  const [filterby, setfilterby] = useState();
  const [datafilter, setdatafilter] = useState(productdata);

  useEffect(() => {
    dispatch(fetchProductList()); // Fetch the product data from the server
  }, [dispatch]);

  useEffect(() => {
    setdatafilter(productdata);
  }, [productdata]);

  const handlefilterproduct = (category) => {
    setfilterby(category);
    const filter = productdata.filter(
      (el) => el.category.toLowerCase() === category.toLowerCase()
    );
    setdatafilter(filter);
  };

  return (
    <div className="text-white">
      <div className="my-5">
        <h2 className="font-bold text-2xl text-white text-center mb-4 py-5">
          {heading}
        </h2>
        <div className="flex flex-wrap justify-center gap-4 overflow-x-auto">
          {categorylist[0] &&
            categorylist.map((el) => {
              return (
                <Filterproduct
                  category={el}
                  onClick={() => handlefilterproduct(el)}
                  key={el}
                  isActive={el === filterby}
                ></Filterproduct>
              );
            })}
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-6  py-1">
          {datafilter.map((el) => {
            return (
              <div className="col-span-1" key={el._id + "cartfeature"}>
                <Cartfeature
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  category={el.category}
                  price={el.price}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

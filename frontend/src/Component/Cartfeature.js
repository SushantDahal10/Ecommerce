import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addCartItem, deleteproduct } from "../redux/productslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";

export default function CartFeature({ id, name, price, image, category }) {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/products/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(deleteproduct(id)); // Remove the product from the Redux store
        toast.success("Product deleted successfully", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      } else {
        toast.error("Could not delete product", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 500,
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting product", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 500,
      });
    }
  };

  const handleAddProductToCart = () => {
    if (userData.email) {
      dispatch(
        addCartItem({
          _id: id,
          name: name,
          price: price,
          category: category,
          image: image,
        })
      );
      toast.success("Product added to cart", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1,
        hideProgressBar: true,
      });
    } else {
      toast.warn("Please login first", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 300,
      });
      navigate("/login");
    }
  };

  return (
    <div className="w-full min-w-[200px] max-w-[200px] text-white hover:shadow-lg drop-shadow-lg py-5 px-4 cursor-pointer flex flex-col">
      {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
        <div className="button">
          <button type="button" onClick={handleDeleteProduct}>
            <MdDelete />
          </button>
        </div>
      )}
      <Link
        exact
        to={`/menu/${id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="no-underline"
      >
        <div className="h-28 flex flex-col justify-center items-center">
          <img src={image} alt="" className="h-full" />
        </div>

        <h3 className="font-semibold text-white no-underline capitalize text-lg mt-3 whitespace-nowrap overflow-hidden">
          {name}
        </h3>
        <p className="text-white font-medium no-underline">{category}</p>
      </Link>
      <p className="py-2">
        <span className="text-red-800">रु</span>
        &nbsp;
        <span className="font-bold text-white">{price}</span>
      </p>
      <button
        style={{ backgroundColor: "#1877F2" }}
        className=" py-1 my-1 rounded w-full"
        onClick={handleAddProductToCart}
      >
        Add to Cart
      </button>
    </div>
  );
}

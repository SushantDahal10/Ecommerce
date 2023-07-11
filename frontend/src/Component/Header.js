import React, { useState } from "react";
import logo from "./logo.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { logoutredux } from "../redux/userSlice.js";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emptyCart } from "../redux/productslice";

export default function Header() {
  const navigate = useNavigate();
  const cartitemnumber = useSelector((state) => state.product.CartItem);
  const productdata = useSelector((state) => state.product.productlist);
  const ProductItem = ({ product }) => {
    const dispatch = useDispatch();
    const { id } = product; // Access the id property from the product prop
    console.log(id); // Log the id value
    // Rest of the ProductItem component code
  };

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.product.CartItem);
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const location = useLocation();
  const [home, sethome] = useState(true);
  const [about, setabout] = useState(false);
  const [contact, setcontact] = useState(false);
  const [menu, setmenu] = useState(false);
  const [cart, setcart] = useState(false);
  const handlecart = () => {
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(true);
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handlemenu = () => {
    setcontact(false);
    setabout(false);
    setmenu(true);
    sethome(false);
    setcart(false);
    window.scrollTo({ top: "0", behavior: "smooth" });
  };
  const handlehome = () => {
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(true);
    setcart(false);
  };
  const handleabout = () => {
    setcontact(false);
    setabout(true);
    setmenu(false);
    sethome(false);
    setcart(false);
  };
  const handlecontact = () => {
    setcontact(true);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(false);
  };
  const handleLogout = () => {
    toast.success("Sucessfully logged out ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 800,
    });
    dispatch(logoutredux());
    dispatch(emptyCart());
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(false);

    navigate("/");
  };

  const changeMenuState = () => {
    setShowMenu(!showMenu);
  };
  const handlelogin = () => {
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(false);
  };
  const handleregister = () => {
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(false);
  };
  const handlenewproduct = () => {
    setcontact(false);
    setabout(false);
    setmenu(false);
    sethome(false);
    setcart(false);
  };
  window.onclick = (event) => {
    const menuElement = document.getElementById("menu");
    if (
      menuElement &&
      !menuElement.closest(".header-menu") &&
      !event.target.closest(".header-menu")
    ) {
      setShowMenu(false);
    }
  };
  console.log(ProductItem._id);

  return (
    <>
      <div className="header-menu">
        <header
          className="fixed shadow-md w-full h-16 px-2 md:px-4 z-20 top-0"
          style={{ backgroundColor: "#18191a" }}
        >
          {/* Desktop Interface */}
          <div className="flex items-center h-full justify-between z-0">
            <div className="h-14 w-20">
              <Link exact to="/">
                <img src={logo} className="h-full w-full" alt="" />
              </Link>
            </div>
            <div className="flex items-center gap-4 md:gap-7">
              <nav className="hidden md:flex gap-4 md:gap-7 text-base md:text-lg">
                <Link
                  exact
                  to="/"
                  onClick={handlehome}
                  className={`${
                    location.pathname === "/"
                      ? "text-white bg- #242526 underlinef decoration-solid decoration-2 underline-offset-8"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Home
                </Link>
                <Link
                  exact
                  to="/menu/64a994c321b1d562ad487221"
                  onClick={handlemenu}
                  className={`${
                    location.pathname === `/menu/64a994c321b1d562ad487221`
                      ? "text-white bg- #242526 underline decoration-solid decoration-2 underline-offset-8"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Menu
                </Link>
                <Link
                  exact
                  to="/about"
                  onClick={handleabout}
                  className={`${
                    location.pathname === "/about"
                      ? "text-white bg- #242526 underlinef decoration-solid decoration-2 underline-offset-8"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  About
                </Link>
                <Link
                  exact
                  to="/contact"
                  onClick={handlecontact}
                  className={`${
                    location.pathname === "/contact"
                      ? "text-white bg- #242526 underline decoration-solid decoration-2 underline-offset-8"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Contact
                </Link>
              </nav>

              <div className="text-2xl text-slate-600 relative cursor-pointer">
                <Link
                  exact
                  to="/cart"
                  onClick={handlecart}
                  className={`${
                    location.pathname === "/cart"
                      ? "text-white bg- #242526 underline decoration-solid decoration-2 underline-offset-8"
                      : "text-blue-500 fw-bold no-underline"
                  }`}
                >
                  {" "}
                  <AiOutlineShoppingCart />
                </Link>
                <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 text-sm text-center rounded-full">
                  {cartitemnumber.length}
                </div>
              </div>

              <div
                className="text-xl text-slate-600 cursor-pointer"
                onClick={changeMenuState}
              >
                <div
                  className="border-2 border-solid border-slate-600 p-1 rounded-full cursor-pointer w-10 h-10 overflow-hidden drop-shadow-md"
                  style={{ backgroundColor: "#191970" }}
                >
                  {userData.image ? (
                    <img
                      src={userData.image}
                      className="w-full h-full"
                      alt=""
                    />
                  ) : (
                    <FaUserAlt />
                  )}
                </div>
                {showMenu && (
                  <div
                    className="absolute right-2 px-2 py-2 shadow drop-shadow-md "
                    style={{ backgroundColor: "#18191a" }}
                  >
                    {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                      <Link
                        exact
                        to="/uploadproduct"
                        className="no-underline text-white fw-bold"
                      >
                        <p
                          className="whitespace-nowrap cursor-pointer no-underline hover:text-white"
                          onClick={handlenewproduct}
                        >
                          New Product
                        </p>
                      </Link>
                    )}

                    {userData.email ? (
                      <Link
                        exact
                        to="/"
                        className="no-underline text-white fw-bold"
                      >
                        <p
                          className="whitespace-nowrap cursor-pointer hover:text-white no-underline"
                          onClick={handleLogout}
                        >
                          {" "}
                          Logout {userData.firstname}
                        </p>
                      </Link>
                    ) : (
                      <>
                        <Link
                          exact
                          to="/login"
                          className="no-underline text-white fw-bold"
                        >
                          <p
                            className="whitespace-nowrap cursor-pointer no-underline hover:text-red-600"
                            onClick={handlelogin}
                          >
                            Login
                          </p>
                        </Link>
                        <Link
                          exact
                          to="/signup"
                          className="no-underline text-white fw-bold"
                        >
                          <p
                            className="whitespace-nowrap cursor-pointer no-underline hover:text-red-600"
                            onClick={handleregister}
                          >
                            Register
                          </p>
                        </Link>
                      </>
                    )}

                    <nav className="text-base md:text-lg flex flex-col md:hidden">
                      <Link
                        exact
                        to="/"
                        onClick={handlehome}
                        className={`px-2 py-1${
                          location.pathname === "/"
                            ? "text-white bg- #242526 underline decoration-solid decoration-2 underline-offset-8"
                            : "text-white fw-bold no-underline"
                        }`}
                      >
                        Home
                      </Link>
                      <Link
                        exact
                        to="/menu/64a994c321b1d562ad487221"
                        onClick={handlemenu}
                        className={`${
                          location.pathname === `/menu/64a994c321b1d562ad487221`
                            ? "text-white bg- #242526 underlinef decoration-solid decoration-2 underline-offset-8"
                            : "text-white fw-bold no-underline"
                        }`}
                      >
                        Menu
                      </Link>
                      <Link
                        exact
                        to="/about"
                        onClick={handleabout}
                        className={`${
                          location.pathname === "/about"
                            ? "text-white bg- #242526 underlinef decoration-solid decoration-2 underline-offset-8"
                            : "text-white fw-bold no-underline"
                        }`}
                      >
                        About
                      </Link>
                      <Link
                        exact
                        to="/contact"
                        onClick={handlecontact}
                        className={`${
                          location.pathname === "/contact"
                            ? "text-white bg- #242526 underlinef decoration-solid decoration-2 underline-offset-8"
                            : "text-white fw-bold no-underline"
                        }`}
                      >
                        Contact
                      </Link>
                    </nav>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Hamburger Menu */}
        <div>
          <div className="md:hidden py-4 px-2">
            {isMenuOpen && (
              <div className="mt-4 space-y-4">
                <Link
                  exact
                  to="/"
                  className={`${
                    location.pathname === "/"
                      ? "text-white fw-bold no-underline "
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Home
                </Link>
                <Link
                  exact
                  to="/menu/64a994c321b1d562ad487221"
                  className={`${
                    location.pathname === "/menu/64a994c321b1d562ad487221"
                      ? "text-white fw-bold no-underline underline"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Menu
                </Link>
                <Link
                  exact
                  to="/about"
                  className={`${
                    location.pathname === "/about"
                      ? "text-white fw-bold no-underline underline"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  About
                </Link>
                <Link
                  exact
                  to="/contact"
                  className={`${
                    location.pathname === "/contact"
                      ? "text-white fw-bold no-underline underline"
                      : "text-white fw-bold no-underline"
                  }`}
                >
                  Contact
                </Link>
                <div className="flex flex-col">
                  <Link
                    exact
                    to="/cart"
                    className={`${
                      location.pathname === "/cart"
                        ? "text-white fw-bold no-underline underline"
                        : "text-white fw-bold no-underline"
                    }`}
                  >
                    <AiOutlineShoppingCart />
                  </Link>
                  <div className="absolute -top-2 -right-2 text-white bg-red-500 h-4 w-4 text-sm text-center rounded-full">
                    {cartitemnumber.length}
                  </div>
                </div>
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    exact
                    to="/uploadproduct"
                    className="no-underline text-white fw-bold"
                  >
                    <p
                      className="whitespace-nowrap cursor-pointer no-underline hover:text-white"
                      onClick={handlenewproduct}
                    >
                      New Product
                    </p>
                  </Link>
                )}
                {userData.email ? (
                  <Link
                    exact
                    to="/"
                    className="no-underline text-white fw-bold"
                  >
                    <p
                      className="whitespace-nowrap cursor-pointer hover:text-white no-underline"
                      onClick={handleLogout}
                    >
                      Logout {userData.firstname}
                    </p>
                  </Link>
                ) : (
                  <>
                    <Link
                      exact
                      to="/login"
                      className="no-underline text-white fw-bold"
                    >
                      <p
                        className="whitespace-nowrap cursor-pointer no-underline hover:text-red-600"
                        onClick={handlelogin}
                      >
                        Login
                      </p>
                    </Link>
                    <Link
                      exact
                      to="/signup"
                      className="no-underline text-white fw-bold"
                    >
                      <p
                        className="whitespace-nowrap cursor-pointer no-underline hover:text-red-600"
                        onClick={handleregister}
                      >
                        Register
                      </p>
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

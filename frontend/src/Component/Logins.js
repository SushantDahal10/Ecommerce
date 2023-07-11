import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginredux } from "../redux/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const showingpassword = () => {
    setshowpassword(!showpassword);
  };
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const userdata = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (email && password) {
      const fetchdata = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/login`,
        {
          method: "POST",
          headers: {
            "content-type": "application/JSON",
          },
          body: JSON.stringify(data),
        }
      );
      const responsedata = await fetchdata.json();

      if (responsedata.alert) {
        dispatch(loginredux(responsedata));
        setTimeout(() => {
          toast.success(
            "Welcome " + userdata.firstname + ", your login was successful!",

            {
              position: toast.POSITION.TOP_CENTER,
              autoClose: 800,
            }
          );
          navigate("/");
        }, 1000);
      } else {
        toast.error("Invalid ID or Password", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      }
    } else {
      toast.warn("Please enter all the details", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#18191a" }}
    >
      <div className="py-14 relative top-10 ">
        <div className="p-3 md:p-4">
          <div className="w-full max-w-md  m-auto flex items-center flex-col p-4 shadow-md drop-shadow-md">
            <div className="w-20 overflow-hidden rounded-full shadow drop-shadow-md">
              <img
                src="https://media.tenor.com/D68fgAJz0tcAAAAM/ekrut-start-up.gif"
                alt=""
                className="w-full"
              />
            </div>
            <form action="" className="w-full py-2" onSubmit={handlesubmit}>
              <label htmlFor="email">E-mail:</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md border-none outline-none text-black"
                value={data.email}
                onChange={handleonchange}
              />
              <label htmlFor="password">Password:</label>
              <div className="flex px-2 py-1 rounded-md mt-2 mb-2 bg-slate-200">
                <input
                  type={showpassword ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full bg-slate-200 border-none outline-none text-black"
                  value={data.password}
                  onChange={handleonchange}
                />
                <span
                  className="py-1 flex text-xl cursor-pointer text-black"
                  onClick={showingpassword}
                >
                  {showpassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </span>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="max-w-[120px] w-full bg-blue-500 hover:bg-blue-600 rounded-md h-10 cursor-pointer text-white text-xl font-medium mt-2"
                >
                  Login
                </button>
              </div>
            </form>
            <p className="mt-3">
              Don't Have an Account?{" "}
              <Link
                exact
                to="/signup"
                className="text-red-500 font-bold text-xl mt-2"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

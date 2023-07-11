import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "./imagetobase64";

export default function Signups() {
  const navigate = useNavigate();
  const [showpassword, setshowpassword] = useState(false);
  const showingpassword = () => {
    setshowpassword(!showpassword);
  };
  const [showpassword1, setshowpassword1] = useState(false);
  const showingpassword1 = () => {
    setshowpassword1(!showpassword1);
  };
  const [data, setdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password1: "",
    image: "",
  });
  console.log(data);
  const handleonchange = (e) => {
    const { name, value } = e.target;
    setdata((previous) => {
      return {
        ...previous,
        [name]: value,
      };
    });
  };
  const handleprofileimage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setdata((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    const { firstname, email, password, password1 } = data;
    if (firstname && email && password && password1) {
      if (password === password1) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const responsedata = await fetchData.json(); // Extract response JSON
        console.log(responsedata);

        if (responsedata.alert) {
          navigate("/login");
          toast.success("Sucessfully Registered ", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 800,
          });
        }
      } else {
        toast.error("please enter all the details properly", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
      }
    } else {
      toast.warn("Please Enter all the details", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 800,
      });
    }
  };
  return (
    <>
      <div
        className="min-h-screen flex items-center justify-center "
        style={{ backgroundColor: "#18191a" }}
      >
        <div className="py-14 relative top-10 ">
          <div className="p-3 md:p-4">
            <div className="w-full max-w-md m-auto flex items-center flex-col p-4 shadow-md drop-shadow-md">
              {/*<h1 className='text-center text-2xl font-bold'>Signup</h1>*/}
              <div className="w-20 overflow-hidden rounded-full shadow drop-shadow-md relative">
                <label htmlFor="profile" className="cursor-pointer">
                  <img
                    src={
                      data.image
                        ? data.image
                        : "https://media.tenor.com/D68fgAJz0tcAAAAM/ekrut-start-up.gif"
                    }
                    alt=""
                    className="w-full"
                  />

                  <input
                    type={"file"}
                    id="profile"
                    className="hidden text-black"
                    accept=" image/*"
                    onChange={handleprofileimage}
                  />
                  <div className="absolute bottom-0 h-1/3 bg-slate-500 w-full text-center ">
                    <p className="text-sm p-1 text-white opacity-50">upload</p>
                  </div>
                </label>
              </div>
              <form action="" className="w-full py-2" onSubmit={handlesubmit}>
                <label htmlFor="firstname">First Name:</label>
                <input
                  type={"text"}
                  id="firstname"
                  name="firstname"
                  className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md  border-none outline-none  text-black"
                  value={data.firstname}
                  onChange={handleonchange}
                />
                <label htmlFor="lastname">Last Name:</label>
                <input
                  type={"text"}
                  id="lastname"
                  name="lastname"
                  className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md  border-none outline-none  text-black"
                  value={data.lastname}
                  onChange={handleonchange}
                />
                <label htmlFor="email">E-mail:</label>
                <input
                  type={"email"}
                  id="email"
                  name="email"
                  className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md  border-none outline-none  text-black"
                  value={data.email}
                  onChange={handleonchange}
                />
                <label htmlFor="password">Password:</label>
                <div className="flex px-2 py-1 rounded-md mt-2 mb-2  bg-slate-200">
                  <input
                    type={!showpassword ? "password" : "text"}
                    id="password"
                    name="password"
                    className="w-full bg-slate-200  border-none outline-none  text-black"
                    value={data.password}
                    onChange={handleonchange}
                  />
                  <span
                    className="py-1 flex text-xl cursor-pointer  text-black"
                    onClick={showingpassword}
                  >
                    {showpassword ? (
                      <AiFillEye></AiFillEye>
                    ) : (
                      <AiFillEyeInvisible></AiFillEyeInvisible>
                    )}
                  </span>
                </div>
                <label htmlFor="password1">Re-enter Password:</label>
                <div className="flex px-2 py-1 rounded-md mt-2 mb-2  bg-slate-200">
                  <input
                    type={!showpassword1 ? "password" : "text"}
                    id="password1"
                    name="password1"
                    className=" w-full bg-slate-200 border-none outline-none  text-black"
                    value={data.password1}
                    onChange={handleonchange}
                  />
                  <span
                    className="py-1 flex text-xl cursor-pointer  text-black"
                    onClick={showingpassword1}
                  >
                    {showpassword1 ? (
                      <AiFillEye></AiFillEye>
                    ) : (
                      <AiFillEyeInvisible></AiFillEyeInvisible>
                    )}
                  </span>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="max-w-[120px] w-full bg-blue-500  hover:bg-blue-600 rounded-md h-10 cursor-pointer text-white text-xl font-medium mt-2 "
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <p className="mt-3">
                Already Have an Account?{" "}
                <Link
                  exact
                  to="/login"
                  className="text-red-500 font-bold text-xl mt-2"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { AiFillEye } from "react-icons/ai";
import { BsFacebook, BsLinkedin, BsInstagram, BsGithub } from "react-icons/bs";
import { AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { loginredux } from "../redux/userSlice";
import { AiOutlineMail } from "react-icons/ai";
import "./contact.css";

export default function Contact() {
  const [showpassword, setshowpassword] = useState(false);
  const showingpassword = () => {
    setshowpassword(!showpassword);
  };
  const [data, setdata] = useState({
    email: "",
    password: "",
    message: "",
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
    const { email, password, message } = data;
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
        toast.success("Message was Sent", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 800,
        });
        setdata({
          email: "",
          password: "",
          message: "",
        });
      } else {
        toast.error("Invalid ID or password", {
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
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#18191a" }}
    >
      <div className="container py-9 mb-5">
        <div className="row justify-content-between">
          <div className="col-md-4">
            <h1 className="fs-1 fw-bolder my-5 text-red-500">
              Let's Order:
              <br />
            </h1>
            <p className="fs-5 text-white">
              Welcome to Nepal Technology, your ultimate destination for
              hassle-free laptop shopping. We understand the importance of
              finding the perfect laptop that meets your unique needs and
              preferences. That's why we've curated a wide selection of
              top-notch laptops from leading brands, ensuring you have access to
              the latest technology and cutting-edge features.
            </p>

            <div className="social-media-container">
              <a
                href="https://mail.google.com/mail/u/0/#inbox?compose=GTvVlcSDbtmLhFDhRXMQKCRHhTSwjxGcWTRDvVZqSJZvVGJPLmlrsHxbfzKJBMtjpbGlKlvLxMDWQ"
                target="_blank"
                className="social-media-icon"
              >
                <AiOutlineMail></AiOutlineMail>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100020434261664"
                className="social-media-icon"
                target="_blank"
              >
                <BsFacebook />
              </a>
              <a
                href="https://www.instagram.com/sushant_dahal11/"
                className="social-media-icon"
                target="_blank"
              >
                <BsInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/sushant-dahal-821b63251"
                className="social-media-icon"
                target="_blank"
              >
                <BsLinkedin />
              </a>
              <a
                href="https://github.com/SushantDahal10"
                className="social-media-icon"
                target="_blank"
              >
                <BsGithub />
              </a>
            </div>
          </div>
          <div className="col-md-8 my-5">
            <div className="p-3 mb-5 bg-body rounded">
              <div className="w-full max-w-md bg-white m-auto flex items-center flex-col p-4">
                <div className="w-20 overflow-hidden rounded-full">
                  <img
                    src="https://media.tenor.com/D68fgAJz0tcAAAAM/ekrut-start-up.gif"
                    alt=""
                    className="w-full"
                  />
                </div>
                <form action="" className="w-full py-2" onSubmit={handlesubmit}>
                  ////
                  <label htmlFor="email" className="text-black">
                    E-mail:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md border-none outline-none text-black"
                    value={data.email}
                    onChange={handleonchange}
                  />
                  <label htmlFor="password" className="text-black">
                    Password:
                  </label>
                  <div className="flex px-2 py-1 rounded-md mt-2 mb-2 bg-slate-200">
                    <input
                      type={!showpassword ? "password" : "text"}
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
                      {showpassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </span>
                  </div>
                  <label htmlFor="message" className="text-black">
                    Message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded-md border-none outline-none text-black"
                    value={data.message}
                    onChange={handleonchange}
                  />
                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={handlesubmit}
                      className="max-w-[120px] w-full bg-blue-500 hover:bg-blue-600 rounded-md h-10 cursor-pointer text-white text-xl font-medium mt-2"
                    >
                      Send
                    </button>
                  </div>
                  <ToastContainer />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

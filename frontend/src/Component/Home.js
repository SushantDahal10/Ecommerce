import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Allproduct from "./Allproduct";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const productdata = useSelector((state) => state.product.productlist);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (!visited) {
      setShowTutorial(true);
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  const handleDismissTutorial = () => {
    setShowTutorial(false);
  };

  return (
    <div className="py-1 p-3 md:p-9">
      <div className="md:flex gap-4 py-14">
        <div className="flex justify-center mx-auto">
          <p className="text-center">
            <strong className="fs-3" style={{ color: "red" }}>
              Welcome,{" "}
              <strong className="fs-2" style={{ color: "blue" }}>
                <Typewriter
                  words={[
                    "To the First Online Laptop Outlet of Nepal",
                    "To the First Online Laptop Outlet of Nepal",
                    "To the First Online Laptop Outlet of Nepal",
                    "To the First Online Laptop Outlet of Nepal",
                  ]}
                  loop={5}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </strong>
            </strong>
          </p>
        </div>
      </div>
      <Carousel
        showStatus={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        interval={2000}
        className="custom-carousel"
      >
        <div className="relative">
          <img
            src="https://i.pinimg.com/564x/24/e6/99/24e699e6e26cd2731d46ec641fbaabb8.jpg"
            alt="First slide"
            className="carousel-image"
          />
          <div className="carousel-caption">
            <h5>First slide label</h5>
            <p>Some representative placeholder content for the first slide.</p>
          </div>
        </div>
        <div>
          <img
            src="https://i.pinimg.com/564x/86/0c/8f/860c8f105c7bc36955502ecfffa442ee.jpg"
            alt="Second slide"
            className="carousel-image"
          />
          <div className="carousel-caption">
            <h5>Second slide label</h5>
            <p>Some representative placeholder content for the second slide.</p>
          </div>
        </div>
        <div>
          <img
            src="https://i.pinimg.com/564x/3d/31/2e/3d312e8d3536ec4d8e182e758b9a8fec.jpg"
            alt="Third slide"
            className="carousel-image"
          />
          <div className="carousel-caption">
            <h5>Third slide label</h5>
            <p>Some representative placeholder content for the third slide.</p>
          </div>
        </div>
      </Carousel>
      <div className=""></div>
      <Allproduct heading="Our Products" />

      {showTutorial && (
        <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white text-sm rounded-md">
          <p>
            To access the different features, click on the profile icon located
            in the top right section of this page.
          </p>
          <button
            className="ml-4 px-2 py-1 rounded bg-blue-900 text-white text-xs"
            onClick={handleDismissTutorial}
          >
            Dismiss
          </button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}

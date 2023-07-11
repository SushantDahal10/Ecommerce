import React from "react";
import { AiOutlineLaptop } from "react-icons/ai";

export default function Filterproduct({ category, onClick, isActive }) {
  const isSmallScreen = window.innerWidth <= 768; // Define the breakpoint for small screens

  return (
    <>
      <div onClick={onClick}>
        <div
          className={`p-3  rounded-full cursor-pointer ${
            isActive && "bg-red-800 text-red-900"
          }`}
          style={{
            backgroundColor: "#1877F2",
            width: isSmallScreen ? "4rem" : "8rem", // Adjust the width as per your requirements
            height: isSmallScreen ? "4rem" : "8rem", // Adjust the height as per your requirements
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "1rem", // Add margin-bottom to create spacing
            flexDirection: "column", // Display icon and text in a column layout
          }}
        >
          <AiOutlineLaptop
            style={{
              fontSize: isSmallScreen ? "1rem" : "2rem", // Adjust the icon size for small screens
              marginBottom: "0.5rem", // Add margin-bottom to create spacing between icon and text
            }}
          />
          {isSmallScreen && (
            <div className="text-center mb-1">
              <AiOutlineLaptop
                style={{
                  fontSize: "1rem", // Adjust the icon size for small screens
                }}
              />
            </div>
          )}
          <p
            className={`text-center font-medium capitalize ${
              isSmallScreen ? "text-xs" : "text-base" // Adjust the font size for small screens
            }`}
          >
            {category}
          </p>
        </div>
      </div>
    </>
  );
}

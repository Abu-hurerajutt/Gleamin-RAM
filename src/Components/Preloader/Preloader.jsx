import React from "react";
import "./Preloader.css";

const Preloader = () => {
  return (
    <div className="p-container">
      <div className="loader">
        {[...Array(8)].map((_, index) => (
          <span
            key={index}
            className="ball"
            style={{ "--delay": index + 1 }}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Preloader;

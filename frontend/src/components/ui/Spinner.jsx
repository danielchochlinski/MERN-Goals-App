import React from "react";
import "./Spinner.scss";

const Spinner = () => {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
};

export default Spinner;

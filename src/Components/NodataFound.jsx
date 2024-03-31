import React from "react";
import nodataImg from "../assets/No data-pana.png";
const NodataFound = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <img src={nodataImg} alt="no-data" className="no-data-img" />
      <h1 className="fs-3">No tasks are added yet</h1>
      <p className="fs-5 mb-0">please add tasks</p>
    </div>
  );
};

export default NodataFound;

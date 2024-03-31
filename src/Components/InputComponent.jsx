import React from "react";
import { PlusSvg } from "../SvgIcons";

const InputComponent = ({ inputValue, setterFun, handler, action }) => {
  return (
    <div
      className="d-flex align-items-center gap-4 w-75 mx-auto"
      id="task-holder"
    >
      <input
        value={inputValue}
        onChange={(e) => setterFun(e.target.value)}
        type="text"
        className="p-3 flex-grow-1 form-control"
      />
      <button
        onClick={handler}
        className="p-3 btn btn-primary fw-semibold flex-shrink-0 d-flex align-items-center gap-2"
      >
        <PlusSvg />
        {action === "add" ? "ADD TASK" : "UPDATE TASK"}
      </button>
    </div>
  );
};

export default InputComponent;

import React from "react";
import './Button.scss'

export default function Button({ children, handleClick }) {
  return (
    <div className="ButtonWrapper">
      <button onClick={handleClick}>{children}</button>
    </div>
  );
}
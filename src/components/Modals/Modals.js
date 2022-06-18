import React from 'react';
import { FaTimes } from "react-icons/fa";

import './Modals.scss'

function Modal({handleClickAway, handleClick, children}) {
  return (
    <div className="ModalOuter" onClick={handleClickAway}>
      <div className="ModalCloseButton"
        onClick={handleClick}
      >
        <FaTimes size={"3em"}/>
      </div>
      <div clasName="ModalInner">
        {children}
      </div>
    </div>
  );
}

export default Modal;
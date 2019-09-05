import React, { Component } from "react";

const Modal = ({ handleClose, show, children }) => {
    let showHideClassName;
    showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;
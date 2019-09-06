import React from "react";

const Modal = ({ handleClose, show, children }) => {
    let showHideClassName;
    showHideClassName = show ? "display-block" : "display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <div className="header">
          <div className="text">Check-In</div>
          <div className="exit"></div>
        </div>
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};

export default Modal;
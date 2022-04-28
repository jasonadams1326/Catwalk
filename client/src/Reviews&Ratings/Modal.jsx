import React from "react";

const Modal = (props) => {
  const showHideClassName = props.isShowing
    ? "modal display-block"
    : "modal display-none";

  return (
    <div className={showHideClassName}>
      <div className="ratings-modal">
        {props.children}
        <button
          className="modal-button"
          type="button"
          onClick={props.handleClose}
        >
          ✖️
        </button>
      </div>
    </div>
  );
};

export default Modal;

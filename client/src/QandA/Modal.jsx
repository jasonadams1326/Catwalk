import React from 'react';

const Modal = (props)=>{
  const showHideClassName = props.isShowing ? "modal display-block" : "modal display-none";
  return(<div className={showHideClassName}>
      <div className="modal-main">
        {props.children}
        <button className= "modal-exit-btn" type="button" onClick={props.handleClose}>✖️</button>
      </div>
    </div>)
};

export default Modal;
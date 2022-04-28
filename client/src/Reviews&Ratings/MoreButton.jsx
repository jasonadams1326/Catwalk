import React from "react";

const MoreButton = (props) => {
  const handleClick = () => {
    let index = props.displayList.length;
    props.addMore(props.reviews[index], props.reviews[index + 1]);
  };

  return (
    <button
      className={props.hideButton ? "hidden" : "more-button"}
      onClick={handleClick}
    >
      More Reviews
    </button>
  );
};

export default MoreButton;

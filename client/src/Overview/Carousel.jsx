import React from "react";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleRight, faChevronCircleLeft, faChevronUp, faChevronDown} from "@fortawesome/free-solid-svg-icons";

const LeftArrow = (props) => {
  return (
    <div className="arrow" onClick={props.goToPrevSlide}>
      <FontAwesomeIcon icon={faChevronCircleLeft} size="2x"/>
    </div>
  )
}

const RightArrow = (props) => {
  return (
    <div className="arrow" onClick={props.goToNextSlide}>
      <FontAwesomeIcon icon={faChevronCircleRight} size="2x" />
    </div>
  )
}

const UpArrow = (props) => {
  return (
    <div className="arrow" onClick={props.goUp}>
      <FontAwesomeIcon icon={faChevronUp} size="2x" />
    </div>
  )
}

const DownArrow = (props) => {
  return (
    <div className="arrow" onClick={props.goDown}>
      <FontAwesomeIcon icon={faChevronDown} size="2x" />
    </div>
  )
}

export {
  LeftArrow,
  RightArrow,
  UpArrow,
  DownArrow
}


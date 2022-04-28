import React from "react";

const Features = (props) => {
  return (
    <div className="features">
      {props.features ?  props.features.map((each, key) => {
        return <div className="feature" key={key}>  {" - " + each.feature + " : " + each.value} ✓</div>
    }) : ""}
    </div>
  )
}

export default Features;
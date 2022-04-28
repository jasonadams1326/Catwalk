import React from "react";

const ProductBreakdown = (props) => {
  const makeSVGtriangle = (percentFilled) => {
    return (
      <svg
        className="triangle"
        x={`${percentFilled}%`}
        y="1px"
        width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
      >
        <polygon points="0 100, 50 15 ,100 100" />
      </svg>
    );
  };

  const triangleSVGPosition = (value) => {
    if (value === null) {
      return 0;
    }
    return (parseInt(value) * 66) / 5;
  };

  if (!props.characteristics) {
    return null;
  }
  return (
    <div className="product-breakdown-container">
      {Object.keys(props.characteristics).map((characteristic, id) => {
        return (
          <div className="product-characteristic" key={id}>
            <span className="characteristic">{characteristic}</span>

            <svg width="100%" height="20px" style={{ display: "inline-block" }}>
              <g>
                <rect fill="#ebebeb" width="32%" height="8px" x="0%"></rect>
                <text x="0%" y="95%" fontSize="10">
                  {props.selections[characteristic][0]}
                </text>
                <rect fill="#ebebeb" width="32%" height="8px" x="33%"></rect>
                <text x="33%" y="95%" fontSize="10">
                  {props.selections[characteristic][2]}
                </text>
                <rect fill="#ebebeb" width="32%" height="8px" x="66%"></rect>
                <text x="66%" y="95%" fontSize="10">
                  {props.selections[characteristic][4]}
                </text>

                {makeSVGtriangle(
                  triangleSVGPosition(
                    props.characteristics[characteristic].value
                  )
                )}
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

export default ProductBreakdown;

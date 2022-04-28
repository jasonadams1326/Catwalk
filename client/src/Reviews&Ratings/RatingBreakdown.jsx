import React from "react";

const RatingBreakdown = (props) => {
  const getRatingAvg = () => {
    let totalStars = 0;
    let avgRating = 0;

    if (Object.keys(props.meta.ratings).length !== 0) {
      for (let key in props.meta.ratings) {
        totalStars += parseInt(key) * parseInt(props.meta.ratings[key]);
      }

      avgRating = totalStars / getTotalRatings();
    }

    return avgRating.toFixed(1);
  };

  const getTotalRatings = () => {
    let total = 0;

    if (Object.keys(props.meta.ratings).length !== 0) {
      for (let key in props.meta.ratings) {
        total += parseInt(props.meta.ratings[key]);
      }
    }
    return total;
  };

  const getPercentageRecommended = () => {
    let yes = props.meta.recommended.true ? props.meta.recommended.true : 0;
    let no = props.meta.recommended.false ? props.meta.recommended.false : 0;
    let total = parseInt(yes) + parseInt(no);
    let averagePercent;
    if (total === 0) {
      averagePercent = 0;
    } else {
      averagePercent = (yes / total) * 100;
    }

    return averagePercent.toFixed(0);
  };

  const setSVGStars = (average) => {
    let avg = Number(average);

    let array = [];

    for (let i = 0; i < 5; i++) {
      if (avg >= 1) {
        array.push(1);
      } else if (avg > 0 && avg < 1) {
        if (avg > 0.6) {
          array.push(0.7);
        } else if (avg < 0.4) {
          array.push(0.3);
        } else {
          array.push(0.5);
        }
      } else {
        array.push(0);
      }
      avg -= 1;
    }

    return array.map((star, id) => {
      return props.makeSVGStar(star, id, 30, 30);
    });
  };

  const makeSVGBar = (percentFilled) => {
    return (
      <svg width="70%" height="16px">
        <g className="bars">
          <rect fill="#ebebeb" width="100%" height="8px" x="5%" y="50%"></rect>
          <rect
            fill="#24BE1D"
            width={`${percentFilled}%`}
            height="8px"
            x="5%"
            y="50%"
          ></rect>
        </g>
      </svg>
    );
  };

  const getPercentageOfRating = (ratingTotal, totalRatings) => {
    return (ratingTotal / totalRatings) * 100;
  };

  if (!props.meta.characteristics) {
    return null;
  }
  return (
    <>
      <div className="rating-breakdown-container">
        <div className="rating-breakdown-title">RATINGS &#38; REVIEWS</div>
        <div className="avg-stars-container">
          <span className="rating-breakdown-avg">{getRatingAvg()}</span>
          <div className="rating-breakdown-stars">
            {setSVGStars(getRatingAvg())}
          </div>
        </div>
        <div className="rating-breakdown-percentage">
          {getPercentageRecommended()}% of reviews recommend this product
        </div>
        <div
          className="rating-breakdown-star"
          onClick={() => {
            props.clickRating(5);
          }}
        >
          <span className="star5-title">5 stars</span>
          {makeSVGBar(
            getPercentageOfRating(props.meta.ratings["5"], getTotalRatings())
          )}
        </div>
        <div
          className="rating-breakdown-star"
          onClick={() => {
            props.clickRating(4);
          }}
        >
          <span className="star4-title">4 stars</span>
          {makeSVGBar(
            getPercentageOfRating(props.meta.ratings["4"], getTotalRatings())
          )}
        </div>
        <div
          className="rating-breakdown-star"
          onClick={() => {
            props.clickRating(3);
          }}
        >
          <span className="star3-title">3 stars</span>
          {makeSVGBar(
            getPercentageOfRating(props.meta.ratings["3"], getTotalRatings())
          )}
        </div>
        <div
          className="rating-breakdown-star"
          onClick={() => {
            props.clickRating(2);
          }}
        >
          <span className="star2-title">2 stars</span>
          {makeSVGBar(
            getPercentageOfRating(props.meta.ratings["2"], getTotalRatings())
          )}
        </div>
        <div
          className="rating-breakdown-star"
          onClick={() => {
            props.clickRating(1);
          }}
        >
          <span className="star1-title">1 stars</span>
          {makeSVGBar(
            getPercentageOfRating(props.meta.ratings["1"], getTotalRatings())
          )}
        </div>
      </div>
    </>
  );
};

export default RatingBreakdown;

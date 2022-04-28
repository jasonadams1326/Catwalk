import React from "react";

class StarRatings extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      isActive: {
        star1: false,
        star2: false,
        star3: false,
        star4: false,
        star5: false,
      },
      isDisabled: false,
    };
  }

  handleClick(rating) {
    if (rating === 5) {
      let isActive = { ...this.state.isActive };
      isActive.star1 = true;
      isActive.star2 = true;
      isActive.star3 = true;
      isActive.star4 = true;
      isActive.star5 = true;

      this.setState({ isActive: isActive, isDisabled: true });
    } else if (rating === 4) {
      let isActive = { ...this.state.isActive };
      isActive.star1 = true;
      isActive.star2 = true;
      isActive.star3 = true;
      isActive.star4 = true;
      isActive.star5 = false;

      this.setState({ isActive: isActive, isDisabled: true });
    } else if (rating === 3) {
      let isActive = { ...this.state.isActive };
      isActive.star1 = true;
      isActive.star2 = true;
      isActive.star3 = true;
      isActive.star4 = false;
      isActive.star5 = false;

      this.setState({ isActive: isActive, isDisabled: true });
    } else if (rating === 2) {
      let isActive = { ...this.state.isActive };
      isActive.star1 = true;
      isActive.star2 = true;
      isActive.star3 = false;
      isActive.star4 = false;
      isActive.star5 = false;

      this.setState({ isActive: isActive, isDisabled: true });
    } else {
      let isActive = { ...this.state.isActive };
      isActive.star1 = true;
      isActive.star2 = false;
      isActive.star3 = false;
      isActive.star4 = false;
      isActive.star5 = false;

      this.setState({ isActive: isActive, isDisabled: !this.state.isDisabled });
    }

    this.props.setRating(rating);
  }

  render() {
    return (
      <div className={this.state.isDisabled ? "stars disabled" : "stars"}>
        <a
          className={this.state.isActive.star1 ? "active" : ""}
          onClick={() => {
            this.handleClick(1);
          }}
        >
          ⭐
        </a>
        <a
          className={this.state.isActive.star2 ? "active" : ""}
          onClick={() => {
            this.handleClick(2);
          }}
        >
          ⭐
        </a>
        <a
          className={this.state.isActive.star3 ? "active" : ""}
          onClick={() => {
            this.handleClick(3);
          }}
        >
          ⭐
        </a>
        <a
          className={this.state.isActive.star4 ? "active" : ""}
          onClick={() => {
            this.handleClick(4);
          }}
        >
          ⭐
        </a>
        <a
          className={this.state.isActive.star5 ? "active" : ""}
          onClick={() => {
            this.handleClick(5);
          }}
        >
          ⭐
        </a>
      </div>
    );
  }
}
export default StarRatings;

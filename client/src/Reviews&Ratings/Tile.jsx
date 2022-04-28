import React from "react";
import axios from "axios";
import moment from "moment";
import Modal from "./Modal.jsx";
import HelpfulReport from "./HelpfulReport.jsx";
import Stars from "../SharedComponents/index.jsx";

class Tile extends React.Component {
  constructor(props) {
    super(props);

    this.state = { modalShowing: false, currentPhoto: "" };

    this.setSVGStars = this.setSVGStars.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  setSVGStars() {
    let rating = this.props.review.rating;

    return [...Array(rating)].map((star, id) => {
      return this.props.makeSVGStar(1, id, 22, 22, true);
    });
  }

  showModal(e) {
    // console.log(e.target.src);
    this.setState({ modalShowing: true, currentPhoto: e.target.src });
  }

  hideModal() {
    this.setState({ modalShowing: false });
  }

  render() {
    return (
      <>
        <div className="tile-container">
          <div className="tile-name-date">
            {this.props.review.reviewer_name}
            {","}
            {moment(this.props.review.date).format("MMMM Do YYYY")}
          </div>
          <div className="tile-star-ratings">{this.setSVGStars()}</div>

          <div className="tile-summary">
            <b>{this.props.review.summary}</b>
          </div>
          <div className="tile-body-container">
            <div className="tile-body">{this.props.review.body}</div>
            <div className="tile-photos">
              {this.props.review.photos.map((photo, id) => {
                return (
                  <img
                    className="tile-photo"
                    key={id}
                    src={photo.url}
                    alt=""
                    width="100"
                    onClick={this.showModal}
                  />
                );
              })}
            </div>
          </div>
          <div className="tile-recommend">
            {this.props.review.recommend ? "✔️ I recommend this product" : ""}
          </div>
          <div>{this.props.review.response}</div>
          <HelpfulReport
            helpfulCount={this.props.review.helpfulness}
            id={this.props.review.review_id}
            updateHelpfulness={this.props.updateHelpfulness}
          />
          <div className="image-modal">
            <Modal
              isShowing={this.state.modalShowing}
              handleClose={this.hideModal}
            >
              <img
                className="img"
                src={this.state.currentPhoto}
                width="150"
              ></img>
            </Modal>
          </div>
          <span className="tile-line">
            ______________________________________________________________________________________________________________________
          </span>
        </div>
      </>
    );
  }
}

export default Tile;

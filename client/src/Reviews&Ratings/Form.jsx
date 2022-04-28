import React from "react";
import StarRatings from "./StarRatings.jsx";
import PhotosForm from "./PhotosForm.jsx";
import Modal from "./Modal.jsx";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      overallRating: "",
      recommend: "true",
      characteristics: {},
      summary: "",
      body: "",
      photos: [],
      nickname: "",
      email: "",
      selections: {},
      modalShowing: false,
    };

    this.validateForm = this.validateForm.bind(this);
    this.validateImage = this.validateImage.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCharacteristicChange =
      this.handleCharacteristicChange.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.setRating = this.setRating.bind(this);
  }

  //validates a form based on the criteria below and sends an alert if not correct format
  validateForm() {
    //mandatory fields blank
    if (
      this.state.overallRating === "" ||
      this.state.recommend === "" ||
      this.state.characteristics === {} ||
      this.state.body === "" ||
      this.state.nickname === "" ||
      this.state.email === ""
    ) {
      alert(
        "Mandatory field blank. Please make sure to fill in all fields with **"
      );
      return false;
    }
    //body
    if (this.state.body.length < 50) {
      alert("Review body less than 50 characters. Please tell us more!");
      return false;
    }
    //email right format
    let regex = /\S+@\S+\.\S+/;
    if (!regex.test(this.state.email)) {
      alert("Please enter a valid email");
      return false;
    }
    //photos check
    for (let photo of this.state.photos) {
      if (!this.validateImage(photo)) {
        alert("One of your photos could not be uploaded");
        return false;
      }
    }
    return true;
  }

  //checks if a link is a valid image
  validateImage(url) {
    let img = new Image();
    img.src = url;
    return img.height != 0;
  }

  showModal() {
    this.setState({ modalShowing: true });
  }

  hideModal() {
    this.setState({ modalShowing: false });
  }

  //submits form inputs to api after validation
  handleSubmit(event) {
    event.preventDefault();
    // console.log("validated or not:", this.validateForm());
    if (this.validateForm()) {
      // console.log("we are validated");
      axios
        .post("/reviews", {
          product_id: parseInt(this.props.product.id),
          rating: this.state.overallRating,
          summary: this.state.summary,
          body: this.state.body,
          recommend: Boolean(this.state.recommend),
          name: this.state.nickname,
          email: this.state.email,
          photos: this.state.photos,
          characteristics: this.state.characteristics,
        })
        .then((data) => {
          // console.log(data);

          //Currently doesn't rerender list
          this.props.getList();
          this.props.renderList();
          this.props.handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  //sets the characteristics inputs based on the selected product
  handleCharacteristicChange(event) {
    let id = this.props.characteristics[event.target.name].id;
    let characteristic = event.target.name;
    let selection = event.target.value;
    let description = "";

    if (this.props.selections[characteristic]) {
      if (selection === "1") {
        description = this.props.selections[characteristic][0];
      } else if (selection === "2") {
        description = this.props.selections[characteristic][1];
      } else if (selection === "3") {
        description = this.props.selections[characteristic][2];
      } else if (selection === "4") {
        description = this.props.selections[characteristic][3];
      } else if (selection === "5") {
        description = this.props.selections[characteristic][4];
      }
    }

    this.setState((prevState) => ({
      selections: {
        ...prevState.selections,
        [characteristic]: description,
      },
      characteristics: {
        ...prevState.characteristics,
        [id.toString()]: parseInt(event.target.value),
      },
    }));
  }

  addPhoto(image) {
    let photos = [...this.state.photos];
    if (photos.length < 5) {
      photos.push(image);
      this.setState({ photos: photos });
    } else {
      alert("Reached photo upload limit");
    }
  }

  setRating(index) {
    this.setState({ overallRating: index });
  }

  render() {
    if (!this.state || !this.props.characteristics) {
      return null;
    }
    return (
      <div>
        <form className="form-container" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column-one">
              <h2 className="form-title">Write your Review</h2>
              <label>
                *Overall Rating*
                <StarRatings setRating={this.setRating} />
              </label>
              <div className="input-container">
                <textarea
                  id="summary"
                  className="input"
                  type="text"
                  value={this.state.summary}
                  name="summary"
                  placeholder=" "
                  onChange={this.handleChange}
                ></textarea>
                <label htmlFor="summary" className="label">
                  Summary
                </label>
              </div>
              <div className="input-container">
                <textarea
                  id="body"
                  className="input"
                  type="text"
                  value={this.state.body}
                  name="body"
                  placeholder=" "
                  onChange={this.handleChange}
                ></textarea>
                <label htmlFor="body" className="label">
                  *Body*
                </label>
              </div>
              <div className="input-container">
                <input
                  id="nickname"
                  className="input"
                  type="text"
                  value={this.state.nickname}
                  name="nickname"
                  placeholder=" "
                  onChange={this.handleChange}
                ></input>
                <label htmlFor="nickname" className="label">
                  *Nickname*
                </label>
              </div>
              <div className="input-container">
                <input
                  id="email"
                  className="input"
                  type="text"
                  value={this.state.email}
                  name="email"
                  placeholder=" "
                  onChange={this.handleChange}
                ></input>
                <label htmlFor="email" className="label">
                  *Email*
                </label>
              </div>
              <br></br>
              <i>For authentication reasons, you will not be emailed</i>
            </div>
            <div className="column-two">
              <h4 className="form-product-name">{this.props.product.name}</h4>
              <label>*Do you recommend this product*</label>
              <div className="recommend">
                <label>
                  Yes:
                  <input
                    type="radio"
                    value="true"
                    name="recommend"
                    defaultChecked="checked"
                    onChange={this.handleChange}
                  ></input>
                </label>
                <label>
                  No:
                  <input
                    type="radio"
                    value="false"
                    name="recommend"
                    onChange={this.handleChange}
                  ></input>
                </label>
              </div>
              <label>*Characteristics*</label>
              <div className="characteristics">
                {Object.keys(this.props.characteristics).map(
                  (characteristic, id) => {
                    return (
                      <div key={id}>
                        <label>{characteristic}</label>
                        <div className="characteristic-choice">
                          <input
                            type="radio"
                            value="1"
                            name={characteristic}
                            onChange={this.handleCharacteristicChange}
                          ></input>
                          <input
                            type="radio"
                            value="2"
                            name={characteristic}
                            onChange={this.handleCharacteristicChange}
                          ></input>
                          <input
                            type="radio"
                            value="3"
                            name={characteristic}
                            onChange={this.handleCharacteristicChange}
                          ></input>
                          <input
                            type="radio"
                            value="4"
                            name={characteristic}
                            onChange={this.handleCharacteristicChange}
                          ></input>
                          <input
                            type="radio"
                            value="5"
                            name={characteristic}
                            onChange={this.handleCharacteristicChange}
                          ></input>
                          <span>{this.state.selections[characteristic]}</span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          <div className="row">
            {this.state.photos.map((photo, id) => {
              return (
                <img
                  className="img-thumbnail"
                  key={id}
                  src={photo}
                  width="50"
                ></img>
              );
            })}
            <button className="button" type="button" onClick={this.showModal}>
              Upload Photos
            </button>
            <button className="button" type="submit">
              Submit
            </button>
          </div>
        </form>
        <Modal isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <PhotosForm addPhoto={this.addPhoto} handleClose={this.hideModal} />
        </Modal>
      </div>
    );
  }
}

export default Form;

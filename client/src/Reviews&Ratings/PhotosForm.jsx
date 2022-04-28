import React from "react";

class PhotosForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { image: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.props.addPhoto(this.state.image);
    this.props.handleClose();
  }

  render() {
    return (
      <form className="photo-form" onSubmit={this.handleSubmit}>
        <div className="input-container">
          <input
            className="input"
            type="text"
            value={this.state.image}
            name="image"
            onChange={this.handleChange}
          ></input>
          <label className="label">Upload</label>
        </div>
        <input className="button" type="submit" value="Submit" />
      </form>
    );
  }
}

export default PhotosForm;

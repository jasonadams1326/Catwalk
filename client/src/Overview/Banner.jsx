import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

class Banner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  // UPDATE PRODUCT BASED ON USER INPUT PRODUCT NUMBER
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct(this.state.value)
  }

  render() {
    return (
      <div className="banner">
        <h1 className="logo">R A T C H A D A M R I</h1>
        <form onSubmit={this.handleSubmit} className="search-bar-area">
          <label className="search-label">
            SEARCH ITEM #:
          </label>
          <input type="text" value={this.state.value} onChange={this.handleChange} className="search-text"/>
          <div  className="search-button">
            <FontAwesomeIcon icon={faSearch} onClick={this.handleSubmit}/>
          </div>
        </form>
      </div>
    );
  }
}

export default Banner;
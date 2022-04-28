import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStyle: 0,
    };
    this.updateStyleIndex = this.updateStyleIndex.bind(this);
  }

  // UPDATE SELECTED STYLE
  updateStyleIndex(index) {
    this.setState({ selectedStyle: index });
  }

  render() {
    var currentStyle = this.props.styles[this.state.selectedStyle];
    return (
      <div className="style-selector">
        <div className="style-name-display">STYLE > {currentStyle ? currentStyle.name : ""}</div>
        <div className="styles">

          {this.props.styles
            ? this.props.styles.map((style, key) => {
                return (
                  <div key={key} className="check-and-style">
                    <FontAwesomeIcon icon={faCheckCircle} className={key === this.state.selectedStyle ? "check clicked" : "check"}/>
                    <img
                      src={style.photos[0].thumbnail_url}
                      key={key}
                      className={key === this.state.selectedStyle ? "style-image clicked" : "style-image"}
                      onClick={(clicked) => {
                        this.props.updateStyle(this.props.styles[key]);
                        this.updateStyleIndex(key);
                      }}
                    />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default StyleSelector;

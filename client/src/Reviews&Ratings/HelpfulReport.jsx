import React from "react";
import axios from "axios";

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isClicked: false, reportClicked: false };

    this.clickYes = this.clickYes.bind(this);
    this.clickReport = this.clickReport.bind(this);
  }

  clickYes() {
    axios
      .put(`/reviews/${this.props.id}/helpful`)
      .then((data) => {
        this.setState({ isClicked: true });
        this.props.updateHelpfulness(this.props.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickReport() {
    axios
      .put(`/reviews/${this.props.id}/report`)
      .then((data) => {
        this.setState({ isClicked: true, reportClicked: true });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="helpful-report-container">
        Helpful?
        <span
          className={this.state.isClicked ? "disabled" : "helpful-report-yes"}
          onClick={this.clickYes}
        >
          (Yes) {this.props.helpfulCount}
        </span>{" "}
        |{" "}
        <span
          className={this.state.isClicked ? "disabled" : "helpful-report-no"}
          onClick={this.clickReport}
        >
          Report{" "}
          {this.state.reportClicked ? (
            <span className="reported"> :Reported</span>
          ) : (
            ""
          )}
        </span>
      </div>
    );
  }
}

export default HelpfulReport;

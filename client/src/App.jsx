import React, { lazy, Suspense } from 'react';
import Banner from "./Overview/Banner.jsx";

import Overview from "./Overview/Overview.jsx";
import Cards from "./Cards/index.jsx";
import ReviewsSection from "./Reviews&Ratings/ReviewsSection.jsx";
import axios from "axios";
import QuestionsList from "./QandA/QuestionsList.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProduct: {},
    };
    //BIND FUNCTIONS IN HERE
    this.updateProduct = this.updateProduct.bind(this);
  }

  // SET DEFAULT PRODUCT ON STARTUP
  componentDidMount() {
    this.updateProduct(37311);
    console.log('hi', this.currentProduct)
  }

  // UPDATE CHOSEN ITEM
  updateProduct(productId) {
    axios
      .get(`/products/${productId}`)
      .then((response) => {
        this.setState({ currentProduct: response.data });
      })
      .catch((err) => {
        console.log(err);
        alert("please search for a valid product number 37311-37320");
      });
  }

  render() {
    return (
      <div>
        <Banner updateProduct={this.updateProduct} />
        <Overview product={this.state.currentProduct} />
        <Cards product={this.state} pageChange={this.updateProduct} />
        <QuestionsList currentProductID={this.state.currentProduct.id} />
        <div className="reviews-container">
          <ReviewsSection product={this.state.currentProduct} />
        </div>
      </div>
    );
  }
}

export default App;

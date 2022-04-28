import React from "react";
import axios from "axios";
import cardHelpers from "./helpers.js";
import Modal from "./Modal.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
// import 'font-awesome/css/font-awesome.min.css';
const findReviewAverage = cardHelpers.cardHelpers.findReviewAverage;

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: "37311",
      product_info: {},
      product_rating: 0,
      product_url: "",
      clickedProduct: "",
      clickedProductInfo: [],
      relatedInfo: {},
      modalShowing: false,
      outfit: [],
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.addItem = this.addItem.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.salePriceChecker = this.salePriceChecker.bind(this);
    this.tableRowMaker = this.tableRowMaker.bind(this);
  }

  componentDidUpdate(prevProps) {
    //add results to newRelated array

    //iterate through newrelated again
    //request url
    //add to newrelated for each item
    if (
      this.props.product.currentProduct.id !== undefined &&
      this.props.product.currentProduct.id !==
        prevProps.product.currentProduct.id
    ) {
      var relatedData = {};
      axios
        .get(`/products/${this.props.product.currentProduct.id}/related`)
        .then((res) => {
          for (var i = 0; i < res.data.length; i++) {
            axios
              .get(`products/${res.data[i]}`)
              .then((result) => {
                relatedData[result.data.id] = [result.data];
                return axios
                  .get(`reviews/meta?product_id=${result.data.id}`)
                  .then((response) => {
                    var avg = findReviewAverage(response.data.ratings);

                    // console.log('avg', avg);
                    relatedData[response.data.product_id].push(avg);

                    return axios
                      .get(`/products/${response.data.product_id}/styles`)
                      .then((styles) => {
                        if (
                          styles.data.results[0].photos[0].thumbnail_url ===
                          null
                        ) {
                          relatedData[styles.data.product_id].push(
                            "https://http.cat/404"
                          );
                          relatedData[styles.data.product_id].push(styles.data.results[0].sale_price);
                          this.setState({
                            relatedInfo: relatedData,
                            product_id: this.props.product.currentProduct.id,
                            product_info: this.props.product.currentProduct,
                          });
                          // console.log(
                          //   "this.props.props",
                          //   this.props.product.currentProduct.id
                          // );
                        } else {
                          relatedData[styles.data.product_id].push(
                            styles.data.results[0].photos[0].thumbnail_url
                          );
                          relatedData[styles.data.product_id].push(styles.data.results[0].sale_price);
                          this.setState({
                            relatedInfo: relatedData,
                            product_id: this.props.product.currentProduct.id,
                            product_info: this.props.product.currentProduct,
                          });
                        }
                        // console.log('relatedData after URL', relatedData);
                      });
                  });
              })
              .catch((error) => console.log("Error in loop: ", error));
          }
        })
        .catch((err) => console.log("Error after loop", err));
    }
  }

  //SHOW MODAL
  showModal(e) {
    // console.log(e.name);
    this.setState({
      modalShowing: true,
      clickedProductInfo: e.features,
      clickedProduct: e.name,
    });
  }

  //HIDE MODAL
  hideModal() {
    this.setState({ modalShowing: false });
  }

  //CARD CLICK
  clickHandler(input) {
    // console.log('this.props', this.props)
    // console.log("input", input);
    this.props.pageChange(input)
  }

  //ADD ITEM TO OUTFIT
  addItem() {
    var newUrl;
    var rating;
    var outfitAddition = [this.props.product.currentProduct];
    var duplicateItem = false;

    //iterate over outfit
      //if outfit already has matching product id?
      // duplicateItem = true
    this.state.outfit.map((item) => {

      if (item[0].id === this.props.product.currentProduct.id) {
        // console.log('item[0].id', item[0].id)
        // console.log('current prod id', this.props.product.currentProduct.id);
        duplicateItem = true;
      }

    })

      if (duplicateItem) {
        alert('Oop, you already have this in your outfit!');
        return;
      }




    axios
      .get(`/products/${this.props.product.currentProduct.id}/styles`)
      .then((styles) => {
        if (styles.data.results[0].photos[0].thumbnail_url === null) {
          outfitAddition[2] = "https://http.cat/404";
          axios
            .get(
              `reviews/meta?product_id=${this.props.product.currentProduct.id}`
            )
            .then((response) => {
              var avg = findReviewAverage(response.data.ratings);
              outfitAddition[1] = avg;
              this.setState({
                outfit: this.state.outfit.concat([outfitAddition]),
              });
            });
        } else {
          outfitAddition[2] = styles.data.results[0].photos[0].thumbnail_url;
          axios
            .get(
              `reviews/meta?product_id=${this.props.product.currentProduct.id}`
            )
            .then((response) => {
              var avg = findReviewAverage(response.data.ratings);
              outfitAddition[1] = avg;
              this.setState({
                outfit: this.state.outfit.concat([outfitAddition]),
              });
            });
        }
      });
  }

//SALE PRICE CHECKER
  salePriceChecker(price, sale) {
    if (sale) {

      return (<span className="item-price item-text">
      {"$" + sale + ' '}<s className="struckthrough">{"$" + price}</s>
    </span>)
    }
    return (<span className="item-price item-text">
                  {"$" + price}
                </span>)
  }

  //REMOVE ITEM
  removeItem (input) {
      var newOutfit = [...this.state.outfit]
      var filteredOutfit = newOutfit.filter((item) => (item[0].id != input));
      this.setState({outfit: filteredOutfit})
  }
  tableRowMaker (characteristic, values, itemOneName, itemTwoName) {
    // console.log('tableRowMaker')
    var checkOne = '';
    var checkTwo = '';
    if (values[itemOneName]) {
      checkOne = '✅';
    }
    if (values[itemTwoName]) {
      checkTwo = '✅';
    }
    return (
      <tr key={characteristic}>
      <td>{checkOne}</td>
      <td>{characteristic}</td>
      <td>{checkTwo}</td>
    </tr>
     )
  }

  renderTable () {
    if (this.state.clickedProductInfo.length > 0) {
      var itemOneName = this.props.product.currentProduct.name;
    var itemTwoName = this.state.clickedProduct;
    var itemOneFeatures = this.state.product_info.features;
    var itemTwoFeatures = this.state.clickedProductInfo;
    // console.log('itemonename', itemOneName);
    // console.log('itemtwoname', itemTwoName);
    // console.log('itemonefeatuers', itemOneFeatures);
    // console.log('itemtwofeatuers', itemTwoFeatures);
    var combinedFeatures = {};
    itemOneFeatures.map((feature) => {
      var featureKey = feature.feature + ': ' + feature.value;
      combinedFeatures[featureKey] = {[itemOneName]: true, [itemTwoName]: false};
    })
    itemTwoFeatures.map((feature) => {
      var featureKey = feature.feature + ': ' + feature.value;
      if (combinedFeatures[featureKey]) {
        combinedFeatures[featureKey][itemTwoName] = true;
      } else {
        combinedFeatures[featureKey] = {[itemOneName]: false, [itemTwoName]: true};
      }
    })
    // combinedFeatures.filter((feature) => ())
    // console.log('combinedFeatures', combinedFeatures)
return ( <div>
  <table className="related-modal">
    <thead>
      <tr>
        <td>{itemOneName}</td>
        <td>Characteristics</td>
        <td>{itemTwoName}</td>
      </tr>
    </thead>
    <tbody>
     {Object.keys(combinedFeatures).map((characteristic) => {
      //  console.log('characteristics', characteristic)
      //  console.log('combinedfeatures at characteristics', combinedFeatures[characteristic]);
       return (this.tableRowMaker(characteristic, combinedFeatures[characteristic], itemOneName, itemTwoName));
     })}
    </tbody>
  </table>
</div>)
    }

  }

  render() {
    return (
      <div className="cards-component">
                 Related Items
          <br />
        <div className="cards">

          {
            /* iterate over state.related
        create new span with CATEGORY/NAME/PRICE/STAR RATING */
            Object.keys(this.state.relatedInfo).map((key, index) => (
              <div className="item" key={index}
              >
                <a
                  className="item-action-button"
                  onClick={() => {
                    this.showModal(this.state.relatedInfo[key][0]);
                  }}
                >
                  ⭐
                </a>
                <img
                  className="item-img"
                  src={this.state.relatedInfo[key][2]} onClick={() => {this.clickHandler(this.state.relatedInfo[key][0].id)}}
                />
                <br />
                <div className="card-body" onClick={() => {this.clickHandler(this.state.relatedInfo[key][0].id)}}>
                <span className="item-category item-text">
                  {this.state.relatedInfo[key][0].category}
                </span>
                <br />

                <span className="item-name item-text">
                  {this.state.relatedInfo[key][0].name}
                </span>
{this.salePriceChecker(this.state.relatedInfo[key][0].default_price, this.state.relatedInfo[key][3])}
                <br />
                <span className="stars item-text">
                  {"Stars: " + this.state.relatedInfo[key][1]}
                </span>
                </div>
              </div>
            ))
          }

          <Modal
            isShowing={this.state.modalShowing}
            handleClose={this.hideModal}
          >
           {this.renderTable()}
          </Modal>
        </div>
{/* <i class="far fa-plus-square"></i> */}

        <div className="outfit">
          {/* <button type="submit" className="far fa-plus-square" onClick={this.addItem}>
          <i className="far fa-plus-square" onClick={this.addItem}></i>
          </button> */}
          Add to Your Outfit
          <br />
          <FontAwesomeIcon size="3x" icon={faPlus} onClick={this.addItem}/>
          <div className="cards">
            {this.state.outfit.map((item, index) => (
              <div className="item" key={index}>
                <a
                  className="item-action-button"
                  onClick={() => {
                    this.removeItem(item[0].id);
                  }}
                >
                  ❌
                </a>
                <img className="item-img" src={item[2]} />
                <br />
                <span className="item-category item-text">
                  {item[0].category}
                </span>
                <br />

                <span className="item-name item-text">{item[0].name}</span>
                <span className="item-price item-text">
                  {"$" + item[0].default_price}
                </span>
                <br />
                <span className="stars item-text">{"Stars: " + item[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cards;

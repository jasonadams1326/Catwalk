import React from "react";
import Tile from "./Tile.jsx";
import axios from "axios";
import MoreButton from "./MoreButton.jsx";
import AddButton from "./AddButton.jsx";
import Form from "./Form.jsx";
import Modal from "./Modal.jsx";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShowing: false,
      value: "Relevant",
      reviews: [],
      displayList: [],
    };
    this.sortByHelpfulness = this.sortByHelpfulness.bind(this);
    this.sortByNewest = this.sortByNewest.bind(this);
    this.sortByRelevant = this.sortByRelevant.bind(this);
    this.getList = this.getList.bind(this);
    this.renderList = this.renderList.bind(this);
    this.addMore = this.addMore.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateHelpfulness = this.updateHelpfulness.bind(this);
    this.filterList = this.filterList.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.product !== this.props.product ||
      prevProps.filteredReviews !== this.props.filteredReviews
    ) {
      axios
        .get("/reviews/", {
          params: {
            product_id: this.props.product.id,
            page: 1,
            count: 1000,
            sort: "Relevant",
          },
        })
        .then(({ data }) => {
          if (this.props.filteredReviews.length !== 0) {
            this.setState({ reviews: this.props.filteredReviews });
          } else {
            this.setState({
              reviews: data.results,
            });
          }
          this.renderList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  sortByHelpfulness() {
    axios
      .get("/reviews/", {
        params: {
          product_id: this.props.product.id,
          page: 1,
          count: 1000,
          sort: "helpful",
        },
      })
      .then(({ data }) => {
        if (this.props.filteredReviews.length !== 0) {
          this.setState({
            value: "Helpful",
            reviews: this.props.filteredReviews,
          });
        } else {
          this.setState({
            value: "Helpful",
            reviews: data.results,
          });
        }
        this.renderList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sortByNewest() {
    axios
      .get("/reviews/", {
        params: {
          product_id: this.props.product.id,
          page: 1,
          count: 1000,
          sort: "newest",
        },
      })
      .then(({ data }) => {
        if (this.props.filteredReviews.length !== 0) {
          this.setState({
            value: "Newest",
            reviews: this.props.filteredReviews,
          });
        } else {
          this.setState({
            value: "Newest",
            reviews: data.results,
          });
        }
        this.renderList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sortByRelevant() {
    axios
      .get("/reviews/", {
        params: {
          product_id: this.props.product.id,
          page: 1,
          count: 1000,
          sort: "relevant",
        },
      })
      .then(({ data }) => {
        // console.log("relevant data:", data.results);
        if (this.props.filteredReviews.length !== 0) {
          this.setState({
            value: "Relevant",
            reviews: this.props.filteredReviews,
          });
        } else {
          this.setState({
            value: "Relevant",
            reviews: data.results,
          });
        }
        this.renderList();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getList() {
    axios
      .get("/reviews/", {
        params: {
          product_id: this.props.product.id,
          page: 1,
          count: 1000,
          sort: "Relevant",
        },
      })
      .then(({ data }) => {
        this.setState({ reviews: data.results });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //displays two reviews in the list
  renderList() {
    let list = [];
    if (this.state.reviews[0]) {
      list.push(this.state.reviews[0]);
    }
    if (this.state.reviews[1]) {
      list.push(this.state.reviews[1]);
    }
    this.setState({ displayList: list });
  }
  // adds at most two reviews when clicking on the add more button
  addMore(review1, review2) {
    let currentList = [...this.state.displayList];
    if (review1) {
      currentList.push(review1);
    }
    if (review2) {
      currentList.push(review2);
    }

    if (currentList.length === this.state.reviews.length) {
      this.setState({ displayList: currentList });
      this.props.hideAddButton();
    } else {
      this.setState({ displayList: currentList });
    }
  }

  handleChange(event) {
    let sortType = event.target.value;

    if (sortType === "Newest") {
      this.sortByNewest();
    } else if (sortType === "Helpful") {
      this.sortByHelpfulness();
    } else {
      this.sortByRelevant();
    }
  }
  // rerenders the reviews list with the updated helpfulness count
  updateHelpfulness(reviewId) {
    let reviews = this.state.displayList.map((review) => {
      if (reviewId === review.review_id) {
        review.helpfulness += 1;
      }
      return review;
    });

    this.setState({ displayList: reviews });
  }
  //returns a filtered list by the rating number
  filterList(reviews, filteredRatings) {
    let filteredReviews = reviews.filter((review) => {
      if (review.rating === filteredRatings[0].rating) {
        return review;
      }
    });
    return filteredReviews;
  }

  showModal() {
    this.setState({ modalShowing: true });
  }

  hideModal() {
    this.setState({ modalShowing: false });
  }

  render() {
    if (
      !this.props.characteristics ||
      !this.props.product ||
      !this.props.reviews ||
      !this.props.ratings ||
      !this.state.reviews ||
      !this.state.displayList
    ) {
    }

    if (this.props.reviews.length === 0) {
      return (
        <div className="list-container">
          <AddButton showModal={this.showModal} />
          <Modal
            isShowing={this.state.modalShowing}
            handleClose={this.hideModal}
          >
            <Form
              characteristics={this.props.characteristics}
              product={this.props.product}
              handleClose={this.hideModal}
              renderList={this.renderList}
              selections={this.props.selections}
              getList={this.getList}
            />
          </Modal>
        </div>
      );
    }
    return (
      <div className="list-container">
        <div className="list-total-reviews">
          {this.state.reviews.length} Reviews,
          <label className="list-dropdown-title">
            Sort on
            <select
              className="list-dropdown"
              value={this.state.value}
              onChange={this.handleChange}
            >
              <option id="a" value="Relevant">
                Relevant
              </option>
              <option id="b" value="Helpful">
                Helpful
              </option>
              <option id="c" value="Newest">
                Newest
              </option>
            </select>
          </label>
        </div>

        <div className="list-tile-container">
          {this.state.displayList.map((review, id) => {
            return (
              <Tile
                key={id}
                review={review}
                updateHelpfulness={this.updateHelpfulness}
                makeSVGStar={this.props.makeSVGStar}
              />
            );
          })}
        </div>
        <div className="list-button-container">
          <MoreButton
            reviews={this.state.reviews}
            displayList={this.state.displayList}
            addMore={this.addMore}
            hideButton={this.props.hide}
          />
          <AddButton showModal={this.showModal} />
        </div>

        <Modal isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <Form
            characteristics={this.props.characteristics}
            product={this.props.product}
            handleClose={this.hideModal}
            renderList={this.renderList}
            selections={this.props.selections}
            getList={this.getList}
          />
        </Modal>
      </div>
    );
  }
}

export default List;

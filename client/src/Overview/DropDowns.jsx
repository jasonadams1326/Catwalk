import React from "react";
import axios from "axios";

class DropDowns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      skuObject: { size: "SELECT SIZE", quantity: "-" },
      skuNumber: null,
      qty: null,
    };
    this.createQuantityOptions = this.createQuantityOptions.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // CREATE QUANTITY OPTIONS FOR QTY DROP DOWN ONCE SIZE HAS BEEN SELECTED
  createQuantityOptions(qty) {
    if (qty === 0) {
      return <option>OUT OF STOCK</option>;
    }
    var options = [
      <option value="-" key={0}>
        {" "}
        -{" "}
      </option>,
    ];

    for (var i = 1; i <= this.state.skuObject.quantity && i <= 15; i++) {
      options.push(
        <option
          value={i}
          key={i}
          onChange={() => {
            this.handleQtyChange;
          }}
        >
          {i}
        </option>
      );
    }
    return options;
  }

  // UPDATE STATE FOR skuObject WHEN A SIZE IS CHOSEN
  handleSizeChange(event) {
    this.setState({
      skuNumber: event.target.value,
      skuObject: this.props.currentStyle.skus[event.target.value],
    });
  }

  // UPDATE STATE FOR SELECTED QTY WHEN A QTY IS CHOSEN
  handleQtyChange(event) {
    this.setState({ qty: event.target.value });
  }

  // MAKE THIS SEND A POST REQUEST
  handleSubmit(event) {
    event.preventDefault();
    console.log("submitted: ", this.state.skuNumber, " x", this.state.qty);
    axios
      .post("/cart", {
        sku_id: this.state.skuNumber,
        count: this.state.qty,
      })
      .then((response) => {
        alert(`added quantity ${this.state.qty}x of item# ${this.state.skuNumber} to cart`);
      })
      .catch((err) => {
        alert(err);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentStyle !== prevProps.currentStyle) {
      this.setState({
        skuObject: { size: "SELECT SIZE", quantity: "-" },
        skuNumber: null,
        qty: null,
      });
    }
  }

  render() {
    var skus = this.props.currentStyle.skus;
    var qty = this.state.skuObject.quantity;
    return (
      <form onSubmit={this.handleSubmit} className="drop-downs">
        <select className="size-menu" value={this.state.sizeValue} onChange={this.handleSizeChange}>
          <option key={"-"}>{this.state.skuObject.size}</option>
          {skus
            ? Object.keys(skus).map((skuNumber, key) => {
                if (skus[skuNumber].quantity > 0) {
                  return (
                    <option value={skuNumber} key={key}>
                      {skus[skuNumber].size}
                    </option>
                  );
                }
              })
            : ""}
        </select>
        <select className="qty-menu" onChange={this.handleQtyChange}>
          {this.createQuantityOptions(qty)}
        </select>
        <input className="cart-button" type="submit" value="ADD TO BAG" />
      </form>
    );
  }
}

export default DropDowns;

import React from "react";
import StyleSelector from "./StyleSelector.jsx";
import DropDowns from "./DropDowns.jsx";
import {FacebookIcon, FacebookShareButton, TwitterIcon, TwitterShareButton, PinterestIcon, PinterestShareButton} from "react-share";

function ProductInfo(props) {

    var product = props.product;
    var current = props.currentStyle;
    var salePrice = props.currentStyle.sale_price;
    var imageURL = current.photos ? current.photos[0].url : "";
    return (
      <div className="product-info">
        <div className="product-category">{product.category} </div>
        <div className="product-name">{product.name} </div>
        <div className="prices">
          <div className={current.sale_price ? "original-price strikethrough" : "original-price"}>
            $ {current.original_price}
          </div>
          <div className="sale-price">{current.sale_price ? "$ " + current.sale_price : ""} </div>
        </div>
        <StyleSelector product={product} styles={props.styles} updateStyle={props.updateStyle} />
        <DropDowns currentStyle={props.currentStyle} />
        <div className="social-media">
          <FacebookShareButton url={imageURL}><FacebookIcon size={40} round={true} /></FacebookShareButton>
          <TwitterShareButton url={window.location.href}><TwitterIcon size={40} round={true} /></TwitterShareButton>
          <PinterestShareButton url={window.location.href} media={imageURL}><PinterestIcon size={40} round={true} /></PinterestShareButton>
        </div>
      </div>
    );
}

export default ProductInfo;

import React from "react";
import { Link } from "react-router-dom";
import ReactStar from 'react-rating-stars-component'



const ProductCard = ({ product }) => {

  const options = {
    edit: false,
    color: 'rgba(20,20,20,0.4)',
    activeColor: "tomato",
    value: product.ratings,
    size: window.innerWidth < 600 ? 10 : 25,
    isHalf: true
  }
  return (
    <div>
      <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[1] ? product.images[1].url : product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
        <div className="productCardSpan">
          <ReactStar {...options} />
          <span>
            ({product.numOfReviews} Reviews)
          </span>
        </div>
        <span>₹{product.price}/-</span>
      </Link>
    </div>
  )
}

export default ProductCard

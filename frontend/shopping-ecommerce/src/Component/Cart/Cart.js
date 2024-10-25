import React, { Fragment } from 'react'
import './Cart.css'
import './CartItemCard.js'
import CartItemCard from './CartItemCard.js'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart, removeItemsToCart } from '../../Action/CartAction.js'
import { Typography } from "@material-ui/core";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Metadata from '../../Metadata.js'


const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    // const item = {
    //     product: "Product1",
    //     price: "200",
    //     quantity: 1,
    //     image: 'https://i.ibb.co/DRST11n/1.webp'
    // }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 > newQty) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }
    const increaseQuantity = (id, quantity, stocks) => {
        const newQty = quantity + 1;
        if (stocks < newQty) {
            return;
        }
        dispatch(addItemsToCart(id, newQty));
    }

    const deleteItemsCart = (id) => {
        dispatch(removeItemsToCart(id));
    }
    const checkoutHandler = () => {
        navigate(`/login?redirect=${encodeURIComponent('shipping')}`);
    }
    return (
        <Fragment>
            <Metadata title={"Cart Details"}/>
            {cartItems.length === 0 ?
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />

                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div> : <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteItemsCart={deleteItemsCart} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>
                                        -
                                    </button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stocks)}>
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))}


                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Gross Total</p>
                                <p>{`₹${cartItems.reduce(
                                    (acc, item) => acc + item.quantity * item.price,
                                    0
                                )}`}</p>

                                {/* .reduce(): The reduce() method is used to calculate a single value by iterating through all elements of the array. In this case, it calculates the total price of all the items in the cart. */}
                                {/* acc: The accumulator that keeps a running total of the cart's total price. */}

                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button onClick={checkoutHandler}>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>}
        </Fragment>

    )
}

export default Cart

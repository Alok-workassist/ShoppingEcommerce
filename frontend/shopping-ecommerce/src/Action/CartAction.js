import axios from "axios";
import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../Constant/CartConstant";

// ADD item To Cart
export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {

        const { data } = await axios.get(`/api/v1/product/single/${id}`);

        dispatch({
            type: ADD_TO_CART,
            payload: {
                product:data.product._id,
                name:data.product.name,
                price:data.product.price,
                image:data.product.images[0].url,
                stocks:data.product.stocks,
                quantity:quantity
            },
        });

        localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
   
};
// ADD Shipping Info To Cart
export const saveShippingInfo = (data) => async (dispatch, getState) => {
    console.log("Dispatching SAVE_SHIPPING_INFO with payload:", data);
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem('shippingInfo', JSON.stringify(getState().cart.shippingInfo));
};


// Remove Cart  From Item
export const removeItemsToCart = (id) => async (dispatch,getState) => {

    dispatch({
        type: REMOVE_CART_ITEM,
        payload:id,
    });

    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));

};
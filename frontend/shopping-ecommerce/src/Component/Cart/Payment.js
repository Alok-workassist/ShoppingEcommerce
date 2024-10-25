import React, { Fragment, useEffect, useRef } from 'react';
import CheckoutSteps from './CheckoutSteps';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Metadata from '../../Metadata';
import { Typography } from '@material-ui/core';
import './Payment.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { loadStripe } from '@stripe/stripe-js';
import { clearError, createOrder } from '../../Action/OrderAction';



const Payment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const dispatch = useDispatch();

  const order = {
    shippingInfo: {
      address: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: shippingInfo.pinCode, // Make sure this property exists
      country: shippingInfo.country,
      phoneNo: shippingInfo.phoneNo,
    },
    orderItem: cartItems,
    totalPrice: orderInfo.totalPrice,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    itemPrice: orderInfo.subtotal,
  };

  // console.log(order);

  const payBtn = useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const alert = useAlert();

  const navigate = useNavigate();
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true; // Disable the button initially

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post("/api/v1/payment/process", paymentData, config);
      const client_secret = data.client_secret;

      if (!stripe || !elements) {
        alert.error("Stripe is not loaded yet. Please try again.");
        payBtn.current.disabled = false; // Enable the button again
        return;
      }
      const cardElement = elements.getElement(CardNumberElement);
      if (cardElement) {
        cardElement.focus();
      }

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      console.log(result); // Log the result for debugging

      if (result.error) {
        payBtn.current.disabled = false;
        alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
        
          // console.log(order);
          
       await dispatch(createOrder(order)); 
          
            navigate("/success");
          
         
        } else {
          alert.error("There's some issue while processing payment ");
        }
        
      }
    } catch (error) {
      payBtn.current.disabled = false;
      alert.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error,alert]);


  return (
    <Fragment>
      <Metadata title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            className="paymentFormBtn"
            ref={payBtn}
          />
        </form>
      </div>
    </Fragment>
  );
};


export default Payment

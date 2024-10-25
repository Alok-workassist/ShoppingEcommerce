import React, { Fragment, useEffect } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import { clearError, getOrderDetails } from "../../Action/OrderAction";
import Loader from "../Layout/Loader/Loader";
import Metadata from "../../Metadata";

const OrderDetails = () => {
    const { order, error, loading } = useSelector((state) => state.orderDetails);

    const { id } = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id]);

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <Metadata title="Order Details" />
                    <div className="orderDetailsPage">
                        <div className="orderDetailsContainer">
                            <Typography component="h1">
                                Order #{order?._id}
                            </Typography>

                            <Typography>Shipping Info</Typography>
                            {order?.shippingInfo ? (
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user?.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>{order.shippingInfo.phoneNo}</span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {`${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pincode}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p>No shipping information available</p>
                            )}
                       
                        <Typography>Payment</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p>
                                    Status: <span  className={
                                        order?.paymentInfo?.status === "succeeded"
                                            ? "greenColor"
                                            : "redColor"
                                    }>{order?.paymentInfo?.status === "succeeded"
                                        ? "PAID"
                                        : "NOT PAID"}</span>
                                </p>
                            </div>
                            <div>
                                <p>Amount:</p>
                                <span>{order?.totalPrice}</span>
                            </div>
                        </div>

                        <Typography>Order Status</Typography>
                        <div className="orderDetailsContainerBox">
                            <div>
                                <p
                                    className={
                                        order?.orderStatus === "Delivered"
                                            ? "greenColor"
                                            : "redColor"
                                    }
                                >
                                    {order?.orderStatus}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailsCartItems">
                        <Typography>Order Items:</Typography>
                        <div className="orderDetailsCartItemsContainer">
                            {order?.orderItem?.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    <span>
                                        {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    </div>

                </Fragment>
            )}
        </Fragment>
    );
};

export default OrderDetails;

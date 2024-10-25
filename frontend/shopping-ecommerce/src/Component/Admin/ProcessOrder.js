import React, { Fragment, useEffect, useState } from "react";
import Metadata from "../../Metadata";
import Sidebar from "./Sidebar";
import "./ProcessOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getOrderDetails, updateOrder } from "../../Action/OrderAction";
import Loader from "../Layout/Loader/Loader";
import { Button } from "@material-ui/core";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { useAlert } from "react-alert";
import { UPDATE_ORDER_RESET } from "../../Constant/OrderConstant";


const ProcessOrder = () => {
    const params = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);

    const address = `${order?.shippingInfo?.address || ""}, ${order?.shippingInfo?.city || ""}, ${order?.shippingInfo?.state || ""}, ${order?.shippingInfo?.pinCode || ""}, ${order?.shippingInfo?.country || ""}`;
    
    const [status,setStatus]=useState('');
    const updateOrderSubmitHandler = () => {

        const myForm = new FormData();
        myForm.set('status', status);
      
        dispatch(updateOrder(params.id, myForm));

    }
    useEffect(() => {
        if(error)
        {
            alert.error(error);
        }
        if(updateError)
        {
            alert.error(updateError);
        }
        if(isUpdated)
        {
            alert.success("Order Updated Successfully");
            dispatch({type:UPDATE_ORDER_RESET})
            navigate("admin/orders");
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch,updateError,isUpdated])
    return (
        <Fragment>
            <Metadata title="Process Order" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order?.orderStatus === "Delivered" ? "block" : "grid",
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order?.user?.name ||"N/A"}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order?.shippingInfo?.phoneNo||"N/A"}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {address}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order?.paymentInfo &&
                                                        order?.paymentInfo.status === "succeeded"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order?.paymentInfo &&
                                                    order?.paymentInfo.status === "succeeded"
                                                    ? "PAID"
                                                    : "NOT PAID"}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order?.totalPrice && order?.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order?.orderStatus && order?.orderStatus === "Delivered"
                                                        ? "greenColor"
                                                        : "redColor"
                                                }
                                            >
                                                {order?.orderStatus && order?.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order?.orderItem &&
                                            order?.orderItem.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>{" "}
                                                    <span>
                                                        {item.quantity} X ₹{item.price} ={" "}
                                                        <b>₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                            <div
                                style={{
                                    display: order?.orderStatus === "Delivered" ? "none" : "block",
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order?.orderStatus === "Processing" && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order?.orderStatus === "Shipped" && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button
                                        id="createProductBtn"
                                        type="submit"
                                        disabled={
                                            loading ? true : false || status === "" ? true : false
                                        }
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default ProcessOrder

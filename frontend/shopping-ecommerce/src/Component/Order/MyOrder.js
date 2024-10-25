import React, { Fragment, useEffect, useState } from 'react';
import "./MyOrders.css";
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { clearError, myAllOrders } from "../../Action/OrderAction";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import LaunchIcon from "@material-ui/icons/Launch";
import Loader from '../Layout/Loader/Loader';
import Metadata from '../../Metadata';
import  {Link}  from 'react-router-dom';

const MyOrder = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {user}= useSelector(state=>state.user);
    const {loading,error ,orders}= useSelector(state=>state.myOrders);

    const rows = [];

    orders && orders.forEach((item,index) => {

        rows.push({
            itemsQty: item.orderItem.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        })
        
    });
    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered"
              ? "greenColor"
              : "redColor";
          },
        },
        {
          field: "itemsQty",
          headerName: "Items Qty",
          type: "number",
          minWidth: 150,
          flex: 0.3,
        },
    
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 270,
          flex: 0.5,
        },
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
          renderCell: (params) => {
            return (
              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                <LaunchIcon />
              </Link>
            );
        }
         
        },
      ];


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }

        dispatch(myAllOrders()); // Only dispatching once
    }, [dispatch, error, alert]);

    return (
        <Fragment>
            <Metadata title={`${user.name} - Orders`} />
            {loading ? <Loader /> : (
                <div className='myOrderPage'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='myOrdersTable'
                        autoHeight
                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )}
        </Fragment>
    );
}

export default MyOrder;

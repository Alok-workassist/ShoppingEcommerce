import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./ProductList.css";
import Metadata from "../../Metadata";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, getAllOrders } from "../../Action/OrderAction";
import { DELETE_ORDER_RESET } from "../../Constant/OrderConstant";

const OrderList = () => {

   
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
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                        onClick={() => {
                            const isConfirmed = window.confirm(
                                "Are you sure you want to delete this order?"
                            );
                            if (isConfirmed) {
                                deleteOrderhandler(params.getValue(params.id, "id"));
                            }
                        }}
                    >
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                );
            },
        },
    ];

    const dispatch = useDispatch();
    const alert = useAlert();

    const { error,orders } = useSelector((state) => state.allOrders);
    const {
        loading,
        error: deleteError,
        isDeleted,
    } = useSelector((state) => state.order);

    const rows = [];

    orders && orders.forEach(item => {
        rows.push({
            itemsQty: item.orderItem.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });

    const params = useParams();
    const deleteOrderhandler = ($id)=>{
        dispatch(deleteOrder($id));
    }

    useEffect(() => {
        if(deleteError)
        {
           alert.error(deleteError);
        }
        if(isDeleted)
        {
            alert.success("Order Deleted Successfully");
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch,isDeleted]);

    return (
        <Fragment>
            <Metadata title={`ALL Orders - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL Orders</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList

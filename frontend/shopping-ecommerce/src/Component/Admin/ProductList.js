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
import { deleteProduct, getAdminAllProducts } from "../../Action/ProductAction";
import { DELETE_PRODUCT_RESET } from "../../Constant/Constant";

const ProductList = () => {

   
    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <EditIcon />
                        </Link>

                        <Button
                        onClick={() => {
                            const isConfirmed = window.confirm(
                                "Are you sure you want to delete this product?"
                            );
                            if (isConfirmed) {
                                deleteProductHandler(params.getValue(params.id, "id"));
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

    const { products } = useSelector((state) => state.products);
    const {
        loading,
        error: deleteError,
        isDeleted,
    } = useSelector((state) => state.product);

    const rows = [];

    products && products.forEach(item => {
        rows.push({
            id: item._id,
            name: item.name,
            stock: item.stocks,
            price: item.price,
        });
    });

    const params = useParams();
    const deleteProductHandler = ($id)=>{
        dispatch(deleteProduct($id));
    }

    useEffect(() => {
        if(deleteError)
        {
           alert.error(deleteError);
        }
        if(isDeleted)
        {
            alert.success("Product Deleted Successfully");
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
        dispatch(getAdminAllProducts());
    }, [dispatch,isDeleted]);

    return (
        <Fragment>
            <Metadata title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList

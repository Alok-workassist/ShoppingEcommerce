import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Metadata from "../../Metadata";
import './ProductReviews.css'
import Star from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useAlert } from "react-alert";
import { clearError, deleteReview, getAllReviews } from "../../Action/ProductAction";
import { DELETE_REVIEW_RESET } from "../../Constant/Constant";
import { useNavigate } from "react-router-dom";

const ProductReviews = () => {

    const [productId, setProductId] = useState("");
    const navigate = useNavigate();

    const { error, reviews, loading } = useSelector((state) => state.productReviews);
    const { isDeleted, error: deleteError } = useSelector((state) => state.review);
    const dispatch = useDispatch();
    const alert = useAlert();

    const columns = [{ field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
        field: "user",
        headerName: "User",
        minWidth: 200,
        flex: 0.6,
    },

    {
        field: "comment",
        headerName: "Comment",
        minWidth: 350,
        flex: 1,
    },

    {
        field: "rating",
        headerName: "Rating",
        type: "number",
        minWidth: 180,
        flex: 0.4,

        cellClassName: (params) => {
            return params.getValue(params.id, "rating") >= 3
                ? "greenColor"
                : "redColor";
        },
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
                    <Button
                        onClick={() => {
                            const isConfirmed = window.confirm(
                                "Are you sure you want to delete this review?"
                            );
                            if (isConfirmed) {
                                deleteReviewHandler(params.getValue(params.id, "id"))
                            }
                        }}

                    >
                        <DeleteIcon />
                    </Button>
                </Fragment>
            );
        },
    },];
    const rows = [];

    reviews && reviews.forEach(item => {
        rows.push({
            "id": item._id,
            "comment": item.comment,
            "rating": item.rating,
        })

    });


    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReview(productId, reviewId));
    }
    useEffect(() => {
        if (productId && productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
    
        if (error) {
            alert.error(error);
            dispatch(clearError());
        }
    
        if (deleteError) {
            alert.error(deleteError);
            dispatch(clearError());
        }
    
        if (isDeleted) {
            alert.success("Review Deleted Successfully");  // Show success alert
            navigate("/admin/reviews");  // Navigate to the reviews page
            dispatch({ type: DELETE_REVIEW_RESET });  // Reset isDeleted state
        }
    }, [dispatch, alert, error, deleteError, isDeleted, productId, navigate]);
    

    return (
        <Fragment>
            <Metadata title={`ALL REVIEWS - Admin`} />

            <div className="dashboard">
                <Sidebar />
                <div className="productReviewsContainer">
                    <form
                        className="productReviewsForm"
                        onSubmit={productReviewsSubmitHandler}
                    >
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={
                                loading ? true : false || productId === "" ? true : false
                            }
                        >
                            Search
                        </Button>
                    </form>
                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}

                </div>
            </div>
        </Fragment>
    )
}

export default ProductReviews

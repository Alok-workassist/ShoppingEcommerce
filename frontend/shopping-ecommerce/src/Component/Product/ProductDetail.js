import React, { Fragment, useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import './ProductDetail.css'; // Assuming you have a CSS file for styling
import ReactStar from 'react-rating-stars-component'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearError, getProductDetails, newReview } from '../../Action/ProductAction';
import { addItemsToCart } from '../../Action/CartAction.js';
import { useParams } from 'react-router-dom';
import { CLEAR_ERROR } from '../../Constant/Constant';
import ReviewCard from './ReviewCard.js';
import Loader from '../Layout/Loader/Loader';
import MetaData from '../../Metadata.js'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
const ProductDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { loading, error, productDetails } = useSelector((state) => state.productDetails);
    const { success, error: reviewError } = useSelector((state) => state.newReview);
    const alert = useAlert();

    const options = {
        edit: false,
        color: 'rgba(20,20,20,0.4)',
        activeColor: "tomato",
        value: productDetails.ratings,
        size: window.innerWidth > 600 ? 20 : 10,
        isHalf: true
    }
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () => {

        const myForm = new FormData();
        myForm.set("rating", rating);
        myForm.set("comment", comment);
        myForm.set("productId", productDetails._id);

        dispatch(newReview(myForm));
        setOpen(false);  // Close the dialog after success
        setRating(0);  // Reset the form fields
        setComment("");
    }



    const increaseQuantity = () => {
        if (productDetails.stocks <= quantity) {
            return;
        }
        const qty = quantity + 1;

        setQuantity(qty);
    }
    const decreaseQuantity = () => {
        if (quantity <= 1) {
            return;
        }
        const qty = quantity - 1;

        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch(addItemsToCart(id, quantity));
        alert.success("Item Added To Cart");
    }


    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }
        if (reviewError) {
            alert.error(error);
            dispatch(CLEAR_ERROR());
        }
        if (success) {
            alert.success('Review Added Successfully')
        }

        dispatch(getProductDetails(id));
    }, [dispatch, success, error, alert,reviewError, id]);

    return (
        <Fragment>
            <MetaData title={`${productDetails.name} |Product Details`} />
            {loading ? <Loader /> : (
                <Fragment>
                    <div className='productDetails'>
                        <div>
                            <Carousel>
                                {productDetails.images && productDetails.images.length > 0 ? (
                                    productDetails.images.map((item, i) => (
                                        <img
                                            className="CarouselImage"
                                            src={item.url}
                                            alt={`${i} Slide`}
                                            key={item.url}
                                        />
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                            </Carousel>
                        </div>
                        <div>
                            <div className="detailsBlock-1">
                                <h2>{productDetails.name}</h2>
                                <p>Product #{productDetails._id}</p>
                            </div>
                            <div className="detailsBlock-2">
                                <ReactStar {...options} />
                                <span className="detailsBlock-2-span">
                                    ({productDetails.numOfReviews}) Reviews
                                </span>
                            </div>
                            <div className="detailsBlock-3">
                                <h1>₹{productDetails.price}</h1>
                                <div className="detailsBlock-3-1">
                                    <div className="detailsBlock-3-1-1">
                                        <button onClick={decreaseQuantity}>-</button>
                                        <input type="number" value={quantity} readOnly />
                                        <button onClick={increaseQuantity}>+</button>
                                    </div>
                                    <button  disabled={productDetails.stocks <= 0}  onClick={addToCartHandler}>Add to Cart</button>
                                </div>
                                <p>
                                    Status:&nbsp;
                                    <b className={productDetails.stocks < 1 ? 'redColor' : 'greenColor'}>
                                        {1 < 1 ? 'Out Of Stock' : 'In Stock'}
                                    </b>
                                </p>
                            </div>
                            <div className="detailsBlock-4">
                                <p>
                                    <strong>Description:</strong> {productDetails.description}
                                </p>
                            </div>
                            <button onClick={submitReviewToggle} className="submitReview">Submit Review</button>
                        </div>
                    </div>

                    <Dialog
                        aria-labelledby="simple-dialog-title"
                        open={open}
                        onClose={submitReviewToggle}
                    >
                        <DialogTitle>Submit Review</DialogTitle>
                        <DialogContent className="submitDialog">
                            <Rating
                                onChange={(e) => setRating(e.target.value)}
                                value={rating}
                                size="large"
                            />
                            <textarea className="submitDialogTextArea"
                                cols="30"
                                rows="5"
                                value={comment} onChange={(e) => setComment(e.target.value)}></textarea>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={submitReviewToggle} color="secondary">
                                Cancel
                            </Button>
                            <Button onClick={reviewSubmitHandler} color="primary">
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>

                    {productDetails && productDetails.reviews && productDetails.reviews.length > 0 ? (
                        <Fragment>
                            <h3 className="reviewsHeading">Reviews</h3>
                            <div className='reviews'>
                                {productDetails.reviews.map((review) => (
                                    <ReviewCard key={review._id} review={review} />
                                ))}
                            </div>
                        </Fragment>
                    ) : (
                        <p className='noReviews'>No Review</p>
                    )}
                </Fragment >
            )
            }
        </Fragment >
    );
};

export default ProductDetail;

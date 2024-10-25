import axios from 'axios';
import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERROR, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_SUCCESS, NEW_REVIEW_REQUEST, NEW_REVIEW_FAIL, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_SUCCESS, ADMIN_PRODUCTS_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL } from '../Constant/Constant';
import { config } from 'bluebird';


export const getAllProducts = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCTS_REQUEST });

        let link = `/api/v1/product/all?page=${currentPage}&keyword=${keyword}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

        if (category) {
            link += `&category=${category}`;
        }

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Admin All roducts
export const getAdminAllProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCTS_REQUEST });

        let link = '/api/v1/admin/product/all';

        const { data } = await axios.get(link);
        dispatch({
            type: ADMIN_PRODUCTS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAIL,
            payload: error.response.data.message,
        });
    }
};


// Admin Create New  Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post('/api/v1/product/create',productData,config);
        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Admin Create Update  Product
export const updateProduct = (id,productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/product/update/${id}`,productData,config);
        dispatch({
            type: UPDATE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Admin Create Update  Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST});
     
        const { data } = await axios.delete(`/api/v1/product/delete/${id}`);
        dispatch({
            type: DELETE_PRODUCT_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/product/single/${id}`);

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST});
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.put('/api/v1/product/reviews/create',reviewData,config);

        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Admin All reviews
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEW_REQUEST});
       
        const { data } = await axios.get(`/api/v1/product/reviews?id=${id}`);

        dispatch({
            type: ALL_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: ALL_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const deleteReview = (productId,id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST});
        
        const { data } = await axios.delete(`/api/v1/product/reviews/delete/?id=${id}&productId=${productId}`);

        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};
import { error } from 'ajv/dist/vocabularies/applicator/dependencies';
import { ALL_PRODUCTS_REQUEST, ALL_PRODUCTS_SUCCESS, ALL_PRODUCTS_FAIL, CLEAR_ERROR, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, NEW_REVIEW_REQUEST, ADMIN_PRODUCTS_REQUEST, ADMIN_PRODUCTS_FAIL, ADMIN_PRODUCTS_SUCCESS, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_REQUEST, NEW_PRODUCT_RESET, NEW_PRODUCT_FAIL, UPDATE_PRODUCT_FAIL, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET, ALL_REVIEW_REQUEST, ALL_REVIEW_SUCCESS, ALL_REVIEW_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL, DELETE_REVIEW_RESET } from '../Constant/Constant';


const initialState = {
    products: [],
    loading: false,
    error: null,
    productsCount: 0
};

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            };
        case ALL_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductCount: action.payload.filteredProductCount,
            };
        case ADMIN_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
            };
        case ALL_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                payload: action.response
            };
        case ADMIN_PRODUCTS_FAIL:
            return {
                ...state,
                loading: false,
                payload: action.response
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }

};

export const ProductDetailReducer = (state = { productDetails: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case PRODUCT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                productDetails: action.payload.product
            };
        case PRODUCT_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload // This should be `error` instead of `payload`
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Admin New Product Reducer
export const newProductReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case NEW_PRODUCT_RESET:
            return {
                ...state,
                loading: false,
                success: false// This should be `error` instead of `payload`
            };
        case NEW_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload // This should be `error` instead of `payload`
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

// Update Reducer
export const actionProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload,
            };
        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case UPDATE_PRODUCT_FAIL:
        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case UPDATE_PRODUCT_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
// Review Reducer
export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case NEW_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success
            };
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                success: false// This should be `error` instead of `payload`
            };
        case NEW_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                success: action.payload // This should be `error` instead of `payload`
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
// Admin All Review 
export const productReviewsReducer = (state = [], action) => {
    switch (action.type) {
        case ALL_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                reviews: action.payload.reviews
            };
       
        case ALL_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload // This should be `error` instead of `payload`
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};
// Admin All Review 
export const reviewReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload, 
            };
       
        case DELETE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload // This should be `error` instead of `payload`
            };
        case DELETE_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                isDeleted: false // This should be `error` instead of `payload`
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        default:
            return state;
    }
};

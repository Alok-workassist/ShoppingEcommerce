import axios from 'axios';
import { CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS ,CREATE_ORDER_REQUEST, CLEAR_ERROR, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, ALL_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, DELETE_ORDER_FAIL } from '../Constant/OrderConstant';


//Create new Order

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/v1/order/create-new", order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// My Orders
export const myAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });

        const { data } = await axios.get("/api/v1/user/order/all");

        dispatch({ type: MY_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
// Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });

        const { data } = await axios.get(`/api/v1/order/${id}`);
        if(data){
            
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        }

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};

//Admin

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDER_REQUEST});

        const { data } = await axios.get("/api/v1/admin/order/all");

        dispatch({ type: ALL_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateOrder = (id,order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(`/api/v1/admin/order/update/${id}`, order, config);

        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/v1/admin/order/delete/${id}`);

        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message,
        });
    }
};
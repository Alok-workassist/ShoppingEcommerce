
import { ALL_ORDER_FAIL, ALL_ORDER_REQUEST, ALL_ORDER_SUCCESS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_RESET, DELETE_ORDER_SUCCESS, MY_ORDER_FAIL, MY_ORDER_REQUEST, MY_ORDER_SUCCESS, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_RESET, UPDATE_ORDER_SUCCESS } from '../Constant/OrderConstant';
import { CLEAR_ERROR } from '../Constant/Constant';



const initialState = {

    loading: false,
    error: null,
};

export const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case CREATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

export const MyOrderReducer = (state = orders => [], action) => {
    switch (action.type) {
        case MY_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case MY_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
            };
        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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
export const OrderDetailsReducer = (state = order => { }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload.order,
            };
        case MY_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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

//Admin

export const allOrderReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case ALL_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.payload.orders,
            };
        case ALL_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
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
export const orderReducer = (state = {}, action) => {
    switch (action.type) {
      case UPDATE_ORDER_REQUEST:
      case DELETE_ORDER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case UPDATE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isUpdated: action.payload,
        };
  
      case DELETE_ORDER_SUCCESS:
        return {
          ...state,
          loading: false,
          isDeleted: action.payload,
        };
  
      case UPDATE_ORDER_FAIL:
      case DELETE_ORDER_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_ORDER_RESET:
        return {
          ...state,
          isUpdated: false,
        };
  
      case DELETE_ORDER_RESET:
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
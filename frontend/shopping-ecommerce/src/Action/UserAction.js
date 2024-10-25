import axios from "axios";
import {
    CLEAR_ERROR, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS,
    LOAD_USER_FAIL, LOGOUT_USER_SUCCESS, LOGOUT_USER_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_REQUEST,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL
} from "../Constant/UserConstant";

// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/v1/user/login', { email, password }, config);

        console.log('API Response:', data); // Log the API response

        if (data.success) {
            dispatch({ type: LOGIN_SUCCESS, payload: data });
        } else {
            dispatch({ type: LOGIN_FAIL, payload: data.message || 'Login failed' });
        }
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: LOGIN_FAIL, payload: errorMessage });
    }
};

// Register
export const register = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });

        // Remove the Content-Type header so that axios sets it automatically
        const config = {
            headers: {
                // "Content-Type": "application/json" // Do not set this for FormData
            }
        };

        const { data } = await axios.post('/api/v1/user/register', userdata, config);

        console.log('API Response:', data); // Log the API response

        if (data.success) {
            dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
        } else {
            dispatch({ type: REGISTER_USER_FAIL, payload: data.message || 'Registration failed' });
        }
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: REGISTER_USER_FAIL, payload: errorMessage });
    }
};

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });

        const { data } = await axios.get('/api/v1/me');

        console.log('API Response:', data); // Log the API response

        if (data.success) {
            dispatch({ type: LOAD_USER_SUCCESS, payload: data });
        } else {
            dispatch({ type: LOAD_USER_FAIL, payload: data.message || 'Login failed' });
        }
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: LOAD_USER_FAIL, payload: errorMessage });
    }
};

// logout
export const logout = () => async (dispatch) => {
    try {
        await axios.post(`/api/v1/user/logout`);

        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_USER_FAIL, payload: error.response.data.message });
    }
};


// Profile Update
export const updateProfile = (userdata) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = {
            headers: {
                "Content-Type": "multipart/form-data" // Use 'multipart/form-data' for FormData
            }
        };

        const { data } = await axios.put('/api/v1/user/update/profile', userdata, config);

        if (data.success) {
            dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
        }

    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: errorMessage });
    }
};

// Profile Update Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        // Dispatch password update request
        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        // Set headers for request
        const config = { headers: { "Content-Type": "application/json" } };

        // Make the API call to update the password
        const { data } = await axios.put(`/api/v1/user/update/password`, passwords, config);

        // Dispatch success if API call is successful
        if (data.success) {
            dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
        }
        else {
            dispatch({ type: UPDATE_PASSWORD_FAIL, payload: data.message });
        }

    } catch (error) {
        // Dispatch failure and handle the error message
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload:
                error.response && error.response.data && error.response.data.message
                    ? error.response.data.message // Use server's error message
                    : error.message || "An error occurred. Please try again.", // Fallback to generic error
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post('/api/v1/password/forgot', email, config);

        console.log('API Response:', data); // Ensure this logs the correct response

        if (data.success) {
            dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
        } else {
            dispatch({ type: FORGOT_PASSWORD_FAIL, payload: data.message || 'An error occurred' });
        }
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: errorMessage });
    }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = { headers: { 'Content-Type': 'application/json' } };

        // Use template literal to insert token in the URL
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);

        console.log('API Response:', data); // Log the API response

        if (data.success) {
            dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
        } else {
            dispatch({
                type: RESET_PASSWORD_FAIL,
                payload: data.message || 'Something Went Wrong',
            });
        }
    } catch (error) {
        const errorMessage =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: RESET_PASSWORD_FAIL, payload: errorMessage });
    }
};

export const clearError = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR });
};

// Admin All User

export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST })
       const {data} =  await axios.get(`/api/v1/admin/user/all`);

        dispatch({ type: ALL_USERS_SUCCESS ,payload:data});
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST })
       const {data} =  await axios.get(`/api/v1/admin/user/single/${id}`);

        dispatch({ type: USER_DETAILS_SUCCESS ,payload:data});
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_USER_REQUEST });
  
      const { data } = await axios.delete(`/api/v1/admin/single/user/delete/${id}`);
  
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DELETE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  export const updateUser = (id, userData) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_USER_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.put(
        `/api/v1/admin/single/user/update/${id}`,
        userData,
        config
      );
  
      dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

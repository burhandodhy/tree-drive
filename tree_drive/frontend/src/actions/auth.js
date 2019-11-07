import axios from "axios";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actionTypes/auth";

import { getCookie } from "../helper/utils";
import { GET_ERRORS } from "../actionTypes/errors";

// Login
export const userLogin = (username, password) => dispatch => {
  const request = axios.create({
    headers: { "X-CSRFToken": getCookie("csrftoken") }
  });

  request
    .post("/api/login/", {
      username: username,
      password: password
    })
    .then(response => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      const errors = {
        msg: error.response.data,
        status: error.response.status
      };

      dispatch({ type: LOGIN_FAIL });
      dispatch({
        type: GET_ERRORS,
        payload: errors
      });
    });
};

// Check user and load token.
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });

  // Get token
  const token = getState().auth.token;

  if (!token) {
    return;
  }

  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("/api/user-login/", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(error => {
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Logout User
export const logOutUser = () => (dispatch, getState) => {
  // Get token
  const token = getState().auth.token;

  // Header
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .post("/api/logout/", null, config)
    .then(res => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch(err => {
      console.log(err.response);
    });
};

// Register
export const userRegistration = state => dispatch => {
  const {
    username,
    email,
    password,
    repeat_password,
    first_name,
    last_name,
    address,
    city,
    country,
    zip_code
  } = state;

  const request = axios.create({
    headers: { "X-CSRFToken": getCookie("csrftoken") }
  });

  request
    .post("/api/user/", {
      username: username,
      password: password,
      repeat_password: repeat_password,
      email: email,
      first_name: first_name,
      last_name: last_name,
      address: address,
      city: city,
      country: country,
      zip_code: zip_code
    })
    .then(response => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data
      });
    })
    .catch(error => {
      error = Object.keys(error.response.data).map((key, index) => {
        let errors = {
          msg: error.response.data[key][0],
          status: key
        };
        dispatch({
          type: GET_ERRORS,
          payload: errors
        });
      });
    });
};

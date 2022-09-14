import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

import { Constants } from '../../constants'
import axios from 'axios'

export const register = (first_name, last_name, email, password, re_password) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  })

  const config = {
    headers :{
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    first_name,
    last_name,
    email,
    password,
    re_password
  })

  try {

    const res = await axios.post(`${Constants.apiAuth}/users/`, body, config)

    if (res.status === 201){
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    }
    else {
      dispatch({
        type: REGISTER_FAIL,
      })
    }
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
  catch(error){
    dispatch({
      type: REGISTER_FAIL,
    })
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
}

export const activate = (uid, token) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  })

  const config = {
    headers :{
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({
    uid,
    token
  })

  try {

    const res = await axios.post(`${Constants.apiAuth}/users/activation/`, body, config)

    if (res.status === 204){
      dispatch({
        type: ACTIVATION_SUCCESS
      })
    }
    else {
      dispatch({
        type: ACTIVATION_FAIL
      })
    }
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
  catch(error){
    dispatch({
      type: ACTIVATION_FAIL
    })
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
}

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({
        email,
        password
    });

    try {
      const res = await axios.post(`${Constants.apiAuth}/jwt/create/`, body, config);

      if (res.status === 201){
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data
        })
      }
      else {
        dispatch({
          type: LOGIN_FAIL,
        })
      }
    }
    catch(error){
      dispatch({
        type: LOGIN_FAIL,
      })
    }
}
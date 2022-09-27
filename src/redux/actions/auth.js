import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  SET_AUTH_LOADING,
  REMOVE_AUTH_LOADING,
  AUTHENTICATED_SUCCESS,
  AUTHENTICATED_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  LOGOUT
} from "./types";

import { Constants } from '../../constants'
import { setAlert } from "./alert";
import axios from 'axios'
import store from "../../store";

export async function check_authenticated () {
  if (localStorage.getItem('access')){
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }

    const body = JSON.stringify({
      token: localStorage.getItem('access')
    })

    try{
      const res = await axios.post(`${Constants.apiAuth}/jwt/verify/`, body, config)

      if (res.status === 200){
        store.dispatch({
          type: AUTHENTICATED_SUCCESS
        })
      }
      else{
        store.dispatch({
          type: AUTHENTICATED_FAIL
        })
      }
    }
    catch(err){
      store.dispatch({
        type: AUTHENTICATED_FAIL
      })
    }
  }
  else{
    store.dispatch({
      type: AUTHENTICATED_FAIL
    })
  }
}

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
      dispatch(setAlert('' +
        'Registration Successful! We sent you a mail to activate you account',
        'green'
      ))
    }
    else {
      dispatch({
        type: REGISTER_FAIL,
      })
      dispatch(setAlert('' +
        'Error',
        'red'
      ))
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
    dispatch(setAlert('' +
      'Error connecting to server',
      'red'
    ))
  }
}

export async function load_user() {

  if(localStorage.getItem('access')){
    const config = {
      headers: {
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    }

    try {
      const res = await axios.get(`${Constants.apiAuth}/users/me/`, config)

      if (res.status === 200){
        store.dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data
        })
      }
      else{
        store.dispatch({
          type: USER_LOADED_FAIL
        })
      }
    }
    catch (err){
      store.dispatch({
        type: USER_LOADED_FAIL
      })
    }
  }
  else{
    store.dispatch({
      type: USER_LOADED_FAIL
    })
  }
}

export const login = (email, password) => async dispatch => {
  dispatch({
    type: SET_AUTH_LOADING
  })

  const config = {
      headers: {
          'Content-Type': 'application/json'
      }
  }

  const body = JSON.stringify({
      email,
      password
  });

  try {
    const res = await axios.post(`${Constants.apiAuth}/jwt/create/`, body, config);

    if (res.status === 200){
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
      dispatch(setAlert('' +
        'Login Successful!',
        'green'
      ))
    }
    else {
      dispatch({
        type: LOGIN_FAIL,
      })
      dispatch({
        type: REMOVE_AUTH_LOADING
      })
      dispatch(setAlert('' +
        'Error logging in',
        'red'
      ))
    }
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
  }
  catch(error){
    dispatch({
      type: LOGIN_FAIL,
    })
    dispatch({
      type: REMOVE_AUTH_LOADING
    })
    dispatch(setAlert('' +
      'Error logging in with server connection. Try it later',
      'red'
    ))
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
      dispatch(setAlert('' +
        'Account Activated Successfully!',
        'green'
      ))
    }
    else {
      dispatch({
        type: ACTIVATION_FAIL
      })
      dispatch(setAlert('' +
        'Error',
        'red'
      ))
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
    dispatch(setAlert('' +
      'Error connecting to server',
      'red'
    ))
  }
}

export async function refresh () {
  if (localStorage.getItem('refresh')){
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    const body = JSON.stringify({
      refresh: localStorage.getItem('refresh')
    })

    try{
      const res = await axios.post(`${Constants.apiAuth}/jwt/refresh/`, body, config)

      if (res.status === 200){
        store.dispatch({
          type: REFRESH_SUCCESS,
          payload: res.data
        })
      }
      else{
        store.dispatch({
          type: REFRESH_FAIL
        })
      }
    }
    catch(err){
      store.dispatch({
        type: REFRESH_FAIL
      })
    }
  }
  else {
    store.dispatch({
      type: REFRESH_FAIL
    })
  }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Successfully logged out', 'green'));
}
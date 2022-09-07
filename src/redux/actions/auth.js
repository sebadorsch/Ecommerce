import{
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
} from "./types";

import { Constants } from '../../constants'
import axios from 'axios'

export const register = (first_name, last_name, email, password, re_password) => async dispatch => {
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
  }
  catch(error){
    dispatch({
      type: REGISTER_FAIL,
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
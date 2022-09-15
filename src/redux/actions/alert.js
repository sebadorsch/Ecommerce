import{
  SET_ALERT,
  REMOVE_ALERT
} from "./types";

export const setAlert = (msg, alertType, timeOut = 10000) => dispatch => {
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType }
  })

  setTimeout(() => dispatch({ type: REMOVE_ALERT }), timeOut)
}
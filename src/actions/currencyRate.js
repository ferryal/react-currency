import axios from 'axios';
import config from './../config';
import { CURRENCYRATE } from './ActionTypes';


function loading() {
  return {
    type: CURRENCYRATE.LOADING
  };
}

function fetchSuccess(data) {
  return {
    type: CURRENCYRATE.FETCH_SUCCESS,
    payload: { data }
  };
}

function fetchFailed() {
  return {
    type: CURRENCYRATE.FETCH_FAILED
  };
}

export function fetchCurrencyRate() {
  return (dispatch) => {
    dispatch(loading());
    axios.get(`${config.apiUrl}/v1/latest?access_key=${config.accessKey}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
      if (res.status === 200) {
        const response = res.data;
        dispatch(fetchSuccess(response));
      } else {
        dispatch(fetchFailed());
      }
    }).catch(() => {
      dispatch(fetchFailed());
    });
  };
}

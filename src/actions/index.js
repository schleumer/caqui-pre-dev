import * as constants from '../constants';
import * as r from 'redux-simple-router';
import { request } from '../system';
import * as system from '../system';

let messageId = 0;
const messageFromResponse = m => {
  if (m.name) {
    m.name = m.field;
  }
  if (!m.id) {
    messageId = messageId + 1;
    m.id = messageId;
  }
  return m;
}

export function dumpMessagesFromResponse(messages) {
  return {
    type: constants.DUMP_MESSAGES_FROM_REQUEST,
    data: messages.map(messageFromResponse)
  }
}

export function dumpErrorsFromResponse(errors) {
  return {
    type: constants.DUMP_ERRORS_FROM_REQUEST,
    data: errors.map(messageFromResponse)
  }
}

export function error(name, message = 'Error', field = 'general') {
  return {
    type: constants.ERROR,
    data: {
      name,
      message,
      field
    }
  }
}

export function forgetError(item) {
  return {
    type: constants.FORGET_ERROR,
    data: item
  }
}

export function message(name, message = 'Error', field = 'general') {
  return {
    type: constants.MESSAGE,
    data: {
      name,
      message,
      field
    }
  }
}

export function forgetMessage(item) {
  return {
    type: constants.FORGET_MESSAGE,
    data: item
  }
}

export function loading(state, message = null, subMessage = null) {
  return {
    type: constants.IS_LOADING,
    data: {
      state,
      message,
      subMessage
    }
  }
}

export function userFirstFetch() {
  return {
    type: constants.USER_FIRST_FETCH
  }
}

export function userFetchSucceeded(data) {
  return {
    type: constants.USER_FETCH_SUCCEEDED,
    data,
  };
}

export function userLogoutSucceeded() {
  return {
    type: constants.USER_LOGOUT
  };
}

export function userFetchFailed(data) {
  return {
    type: constants.USER_FETCH_FAILED,
    data,
  };
}

export function fetchUser() {
  return dispatch => {
    dispatch(loading(true))

    return request
      .get('/auth/login')
      .then((res = {}) => {
        const {parcel} = res;
        dispatch(userFetchSucceeded(parcel));
        return res;
      })
      .catch(ex => {
        //dispatch(r.updatePath('/login'));
        dispatch(message('login', 'Autentique-se para usar o sistema', 'auth'));
        Promise.reject(ex);
      })
      .then(() => {
        dispatch(userFirstFetch())
        dispatch(loading(false))
      });
  }
}


export function applicationLoaded(data) {
  return dispatch => {
    dispatch({
      type: constants.APPLICATION_LOADED,
      data
    });

    dispatch(fetchUser());
  };
}

export function userLogout(data, back) {
  return (dispatch, getState) => {
    dispatch(loading(true, "Saindo..."))

    return request
      .delete('/auth/login')
      .then(res => {
        dispatch(r.updatePath('/login'));
        dispatch(userLogoutSucceeded());
        return res;
      })
      .catch(ex => {
        console.trace(ex);
      }).then(() => {
      dispatch(loading(false))
    })
  }
}


export function userLogin(data, back) {
  return (dispatch, getState) => {
    dispatch(loading(true, "Enviando Credenciais"))

    const realData = {
      login: data.username,
      password: data.password
    };

    return request
      .post('/auth/login', realData)
      .then(res => {
        const {parcel} = res;
        const state = getState();

        dispatch(userFetchSucceeded(parcel));
        dispatch(r.updatePath(back));
        return res;
      })
      .catch(ex => {
        console.trace(ex);
      }).then(() => {
      dispatch(loading(false))
    })
  }
}


export function why(data) {
  return {
    type: constants.WHY,
    data
  }
}
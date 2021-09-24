import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_FAILURE,
  USER_LOADING_SUCCESS,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_REQUEST,
} from 'redux/types/user_types';

// LOGIN
const loginUserAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/auth/login', data, config);
};

function* loginUser(action) {
  try {
    const result = yield call(loginUserAPI, action.payload);

    yield put({
      type: LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    alert(`${e.response.data.msg}`);

    yield put({
      type: LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchLoginUser() {
  yield takeEvery(LOGIN_REQUEST, loginUser);
}

// GOOGLE LOGIN
const googleLoginUserAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/auth/google', data, config);
};

function* googleLoginUser(action) {
  try {
    const result = yield call(googleLoginUserAPI, action.payload);

    yield put({
      type: GOOGLE_LOGIN_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: GOOGLE_LOGIN_FAILURE,
      payload: e.response,
    });
  }
}

function* watchGoogleLoginUser() {
  yield takeEvery(GOOGLE_LOGIN_REQUEST, googleLoginUser);
}

// LOGOUT
function* logout() {
  try {
    yield put({
      type: LOGOUT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: LOGOUT_FAILURE,
    });
  }
}

function* watchlogout() {
  yield takeEvery(LOGOUT_REQUEST, logout);
}

// Register
const registerUserAPI = (data) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return axios.post('api/user/register', data, config);
};

function* registerUser(action) {
  try {
    const result = yield call(registerUserAPI, action.payload);

    yield put({
      type: REGISTER_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    alert(`${e.response.data.msg}`);

    yield put({
      type: REGISTER_FAILURE,
      payload: e.response,
    });
  }
}

function* watchregisterUser() {
  yield takeEvery(REGISTER_REQUEST, registerUser);
}

// User Loading
const userLoadingAPI = (token) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.get('api/auth/user', config);
};

function* userLoading(action) {
  try {
    const result = yield call(userLoadingAPI, action.payload);

    yield put({
      type: USER_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: USER_LOADING_FAILURE,
      payload: e.response,
    });
  }
}

function* watchuserLoading() {
  yield takeEvery(USER_LOADING_REQUEST, userLoading);
}

export default function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchlogout),
    fork(watchregisterUser),
    fork(watchuserLoading),
    fork(watchGoogleLoginUser),
  ]);
}

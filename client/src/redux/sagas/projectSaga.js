import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import {
  PROJECT_WRITE_REQUEST,
  PROJECT_WRITE_SUCCESS,
  PROJECT_WRITE_FAILURE,
  PROJECT_DETAIL_REQUEST,
  PROJECT_DETAIL_SUCCESS,
  PROJECT_DETAIL_FAILURE,
  PROJECT_LOADING_REQUEST,
  PROJECT_LOADING_SUCCESS,
  PROJECT_LOADING_FAILURE,
} from 'redux/types/project_types';

// CREATE project
const createProjectAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }, // 파일때문에 form-data 사용
  };

  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return axios.post('/api/project/write', payload, config);
};

function* createProject(action) {
  try {
    const result = yield call(createProjectAPI, action.payload);

    console.log(result);
    yield put({
      type: PROJECT_WRITE_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: PROJECT_WRITE_FAILURE,
      payload: e,
    });
  }
}

function* watchcreateProject() {
  yield takeEvery(PROJECT_WRITE_REQUEST, createProject);
}

export default function* projectSaga() {
  yield all([fork(watchcreateProject)]);
}

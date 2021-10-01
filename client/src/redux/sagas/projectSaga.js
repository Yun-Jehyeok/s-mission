import axios from 'axios';
import { all, call, put, takeEvery, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
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

    yield put({
      type: PROJECT_WRITE_SUCCESS,
      payload: result.data,
    });

    yield put(push(`detail/${result.data._id}`))
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

// READ project // Detail
const detailprojectAPI = (payload) => {
  return axios.get(`/api/project/${payload}`);
};

function* detailProject(action) {
  try {
    const result = yield call(detailprojectAPI, action.payload);

    yield put({
      type:PROJECT_DETAIL_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type:PROJECT_DETAIL_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectDetail() {
  yield takeEvery(PROJECT_DETAIL_REQUEST, detailProject);
}

// READ project // All
const allprojectAPI = () => {
  return axios.get(`/api/project`);
}

function* allProject(action) {
  try {
    const result = yield call(allprojectAPI, action.payload);
    
    yield put({
      type:PROJECT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch(e){
    yield put({
      type:PROJECT_LOADING_FAILURE,
      payload: e,
    });
  }
}

function* watchprojectall() {
  yield takeEvery(PROJECT_LOADING_REQUEST, allProject);
}

export default function* projectSaga() {
  yield all([fork(watchcreateProject), fork(watchprojectDetail), fork(watchprojectall)]);
}

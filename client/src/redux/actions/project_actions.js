import {
  PROJECT_WRITE_REQUEST,
  PROJECT_DETAIL_REQUEST,
  PROJECT_LOADING_REQUEST,
} from 'redux/types/project_types';

export const createprojectAction = (data) => ({
  type: PROJECT_WRITE_REQUEST,
  payload: data,
});

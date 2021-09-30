import {
  PROJECT_WRITE_REQUEST,
  PROJECT_DETAIL_REQUEST,
  PROJECT_LOADING_REQUEST,
} from 'redux/types/project_types';

export const createprojectAction = (data) => ({
  type: PROJECT_WRITE_REQUEST,
  payload: data,
});

export const detailprojectAction = (project_id) => ({
  type: PROJECT_DETAIL_REQUEST,
  payload: project_id,
});

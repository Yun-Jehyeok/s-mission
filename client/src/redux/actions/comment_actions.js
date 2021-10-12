import { PROJECT_COMMENT_DELETE_REQUEST } from 'redux/types/project_types';
import {
  PROJECT_COMMENT_LOADING_REQUEST,
  PROJECT_COMMENT_UPLOADING_REQUEST,
} from 'redux/types/project_types';

export const loadcommentAction = (projectID) => ({
  type: PROJECT_COMMENT_LOADING_REQUEST,
  payload: data,
});
export const deletecommentAction = (userID) => ({
  type: PROJECT_COMMENT_DELETE_REQUEST,
  payload: data,
});
export const editcommentAction = (userID) => ({
  type: PROJECT_COMMENT_EDIT_REQUEST,
  payload: data,
});
export const createcommentAction = (userID, projectID) => ({
  type: PROJECT_COMMENT_UPLOADING_REQUEST,
  payload: data,
});

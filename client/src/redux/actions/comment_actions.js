import {
  COMMENT_EDIT_REQUEST,
  COMMENT_LOADING_REQUEST,
  COMMENT_UPLOADING_REQUEST,
  COMMENT_DELETE_REQUEST,
} from 'redux/types/project_types';

export const loadcommentAction = (projectID) => ({
  type: COMMENT_LOADING_REQUEST,
  payload: projectID,
});
export const deletecommentAction = (userID) => ({
  type: COMMENT_DELETE_REQUEST,
  payload: userID,
});
export const editcommentAction = (userID) => ({
  type: COMMENT_EDIT_REQUEST,
  payload: userID,
});
export const createcommentAction = (body) => ({
  type: COMMENT_UPLOADING_REQUEST,
  payload: body,
});

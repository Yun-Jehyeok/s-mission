import {
  PROJECT_COMMENT_LOADING_REQUEST,
  PROJECT_COMMENT_LOADING_FAILURE,
  PROJECT_COMMENT_LOADING_SUCCESS,
  PROJECT_COMMENT_UPLOADING_FAILURE,
  PROJECT_COMMENT_UPLOADING_SUCCESS,
  PROJECT_COMMENT_UPLOADING_REQUEST,
} from 'redux/types/project_types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  projects: [],
  is_comment: false,
  contents: '',
  creator: '',
  reply: '',
  date: '',
  errmsg: '',
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_COMMENT_LOADING_REQUEST:
    case PROJECT_COMMENT_UPLOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case PROJECT_COMMENT_LOADING_FAILURE:

    case PROJECT_COMMENT_UPLOADING_FAILURE:
      return {
        ...state,
        isLoading: false,
        is_comment: false,
        errmsg: action.payload.e,
      };

    case PROJECT_COMMENT_UPLOADING_SUCCESS:
    case PROJECT_COMMENT_LOADING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        contents: action.payload,
      };
  }
};

export default authReducer;

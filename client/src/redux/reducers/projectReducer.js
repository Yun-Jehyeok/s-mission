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

const initialState = {
  isAuthenticated: null,
  title: '',
  category: [],
  contents: '',
  creator: '',
  fileUrl: '',
  date: '',
  errmsg: '',
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECT_WRITE_REQUEST:
      return {
        ...state,
      };

    case PROJECT_WRITE_SUCCESS:
      return {
        ...state,
        title: action.payload.title,
        category: action.payload.category,
        contents: action.payload.contents,
        date: action.payload.date,
        fileUrl: action.payload.fileUrl,
        creator: action.payload.creator,
      };
    case PROJECT_WRITE_FAILURE:
      return {
        ...state,
        errmsg: action.payload.e,
      };
    default:
      return state;
  }
};

export default projectReducer;

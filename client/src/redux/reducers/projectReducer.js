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
  PROJECT_EDITPAGE_REQUEST,
  PROJECT_EDITPAGE_SUCCESS,
  PROJECT_EDITPAGE_FAILURE,
  PROJECT_UPDATE_REQUEST,
  PROJECT_UPDATE_SUCCESS,
  PROJECT_UPDATE_FAILURE,
} from 'redux/types/project_types';

const initialState = {
  isAuthenticated: null,
  isLoading: false,
  projects: [],
  projectdetail: [],
  is_project: false,
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
    case PROJECT_EDITPAGE_REQUEST:
    case PROJECT_DETAIL_REQUEST:
    case PROJECT_WRITE_REQUEST:
    case PROJECT_UPDATE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case PROJECT_EDITPAGE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_project: true,
        title: action.payload.title,
        contents: action.payload.contents,
      };
    case PROJECT_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        is_project: true, // 프로젝트가 존재
        projectdetail: action.payload,
        creator: action.payload.creator,
        category: action.payload.category,
      };
    case PROJECT_UPDATE_SUCCESS:
    case PROJECT_WRITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload,
      };

    case PROJECT_DETAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        is_project: false,
      };

    case PROJECT_UPDATE_FAILURE:
    case PROJECT_EDITPAGE_FAILURE:
    case PROJECT_WRITE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errmsg: action.payload.e,
      };
    default:
      return state;
  }
};

export default projectReducer;

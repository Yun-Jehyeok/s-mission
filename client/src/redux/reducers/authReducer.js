import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS,
  CLOSE_ACCOUNT_REQUEST,
  CLOSE_ACCOUNT_SUCCESS,
  CLOSE_ACCOUNT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  USER_LOADING_REQUEST,
  USER_LOADING_SUCCESS,
  USER_LOADING_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
} from 'redux/types/user_types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: '',
  userId: '',
  userName: '',
  closeAccount: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
    case GOOGLE_LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
    case GOOGLE_LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        userId: action.payload.user.id,
        userName: action.payload.user.name,
      };
    case LOGIN_FAILURE:
    case GOOGLE_LOGIN_FAILURE:
    case LOGOUT_FAILURE:
    case REGISTER_FAILURE:
      localStorage.removeItem('token');

      return {
        token: null,
        user: null,
        userId: null,
        userName: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');

      return {
        token: null,
        user: null,
        userId: null,
        userName: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case CLOSE_ACCOUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case CLOSE_ACCOUNT_SUCCESS:
      localStorage.removeItem('token');

      return {
        token: null,
        user: null,
        userId: null,
        userName: null,
        isAuthenticated: false,
        isLoading: false,
        closeAccount: true,
      };
    case CLOSE_ACCOUNT_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case USER_LOADING_REQUEST:
      return {
        ...state,
        isLoading: true,
        closeAccount: false,
      };
    case USER_LOADING_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
        userId: action.payload._id,
        userName: action.payload.name,
      };
    case USER_LOADING_FAILURE:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;

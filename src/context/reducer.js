import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  LOGIN_PASSWORDREST,
  LOGIN_PASSWORDREST_COMPLETE,
  LOGIN_PASSWORDREST_ERROR,
  LOGIN_NEWPASSWORD,
  LOGIN_NEWPASSWORD_COMPLETE,
  LOGIN_NEWPASSWORD_ERROR,
  CLEAR_VALUES_ADMIN,
  CHANGE_VLAUES,
  METHOD_BEGIN,
  METHOD_SUCCESS,
  METHOD_ERROR,
  METHOD_ALL_BEGIN,
  METHOD_ALL_SUCCESS,
  METHOD_ALL_ERROR,
  REASON_BEGIN,
  REASON_SUCCESS,
  REASON_ERROR,
  OCCUPATION_BEGIN,
  OCCUPATION_SUCCESS,
  OCCUPATION_ERROR,
  EDUCATION_BEGIN,
  EDUCATION_SUCCESS,
  EDUCATION_ERROR,
  REASON_ALL_BEGIN,
  REASON_ALL_SUCCESS,
  REASON_ALL_ERROR,
  OCCUPATION_ALL_BEGIN,
  OCCUPATION_ALL_SUCCESS,
  OCCUPATION_ALL_ERROR,
  EDUCATION_ALL_BEGIN,
  EDUCATION_ALL_SUCCESS,
  EDUCATION_ALL_ERROR,
  GET_ALL_BEGIN,
  GET_ALL_SUCCESS,
  GET_ALL_ERROR,
  CREATE_ALL_BEGIN,
  CREATE_ALL_SUCCESS,
  CREATE_ALL_ERROR,
  GETEDU_ALL_BEGIN,
  GETEDU_SUCCESS,
  GETEDU_ERROR,
  CHANGE_VLAUES_EDU,
  CLEAR_VALUES_REASON,
} from './action';

import { initialState } from './appContext';

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values',
    };
  }

  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: '',
    };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting',
    };
  }

  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      PasswordRestStatus: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting',
    };
  }

  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  }

  if (action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }

  //logout user

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      PasswordRestStatus: true,
      user: null,
      token: null,
      jobLocation: '',
      userLocation: '',
    };
  }

  //update user

  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }

  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      pageAdmin: 1,
      [action.payload.name]: action.payload.value,
    };
  }

  if (action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'full-time',
      status: 'pending',
    };

    return {
      ...state,
      ...initialState,
    };
  }

  //login password reset

  if (action.type === LOGIN_PASSWORDREST) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if (action.type === LOGIN_PASSWORDREST_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Link',
    };
  }

  if (action.type === LOGIN_PASSWORDREST_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //new password after reset

  if (action.type === LOGIN_NEWPASSWORD) {
    return { ...state, isLoading: true };
  }

  if (action.type === LOGIN_NEWPASSWORD_COMPLETE) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.msg,
    };
  }

  if (action.type === LOGIN_NEWPASSWORD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  // admin pagination
  if (action.type === CHANGE_VLAUES) {
    return {
      ...state,
      pageAdmin: action.payload.page,
    };
  }

  //method

  if (action.type === METHOD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === METHOD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      methodDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === METHOD_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //reason

  if (action.type === REASON_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REASON_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reasonDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === REASON_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //occupation

  if (action.type === OCCUPATION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === OCCUPATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      occupationDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === OCCUPATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //education

  if (action.type === EDUCATION_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDUCATION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      educationDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === EDUCATION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //methodAll

  if (action.type === METHOD_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === METHOD_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      methodAllDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === METHOD_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //reasonAll

  if (action.type === REASON_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === REASON_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reasonAllDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === REASON_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //occupationAll

  if (action.type === OCCUPATION_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === OCCUPATION_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      occupationAllDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === OCCUPATION_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //educationAll

  if (action.type === EDUCATION_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDUCATION_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      educationAllDeathCount: action.payload.deathCount,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === EDUCATION_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //createPDF

  if (action.type === CREATE_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === CREATE_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //getPDF

  if (action.type === GET_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_ALL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allPDF: action.payload.pdfs,
      pdfCount: action.payload.pdfCount,
      pdfsNumOfPages: action.payload.pdfsNumOfPages,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === GET_ALL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  //getPDFEDU

  if (action.type === GETEDU_ALL_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GETEDU_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      allPDFEDU: action.payload.pdfsEDU,
      pdfCountEDU: action.payload.pdfCountEDU,
      pdfsNumOfPagesEDU: action.payload.pdfsNumOfPagesEDU,
      showAlert: false,
      alertType: 'success',
      alertText: 'User Profile Updated',
    };
  }

  if (action.type === GETEDU_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Error',
    };
  }

  // reason pagination
  if (action.type === CHANGE_VLAUES) {
    return {
      ...state,
      pageAdmin: action.payload.page,
    };
  }

  // edu pagination
  if (action.type === CHANGE_VLAUES_EDU) {
    return {
      ...state,
      pageAdminEDU: action.payload.page,
    };
  }

  //clear values admin

  if (action.type === CLEAR_VALUES_ADMIN) {
    return {
      ...state,
      sortMR: 'latest',
      searchTypeMR: 'all',
      searchMR: 'all',
    };
  }

  //clear values admin

  if (action.type === CLEAR_VALUES_REASON) {
    return {
      ...state,
      sortEDU: 'latest',
      searchTypeEDU: 'all',
      searchEDU: 'all',
    };
  }

  if (action.type === DELETEPDF_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: true,
      alertType: 'success',
      alertText: 'pdf delete success',
    };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;

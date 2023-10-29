import React, { useReducer, useContext } from 'react';
import reducer from './reducer';
import axios from 'axios';
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
  METHOD_BEGIN,
  METHOD_SUCCESS,
  METHOD_ERROR,
  REASON_BEGIN,
  REASON_SUCCESS,
  REASON_ERROR,
  OCCUPATION_BEGIN,
  OCCUPATION_SUCCESS,
  OCCUPATION_ERROR,
  EDUCATION_BEGIN,
  EDUCATION_SUCCESS,
  EDUCATION_ERROR,
  METHOD_ALL_BEGIN,
  METHOD_ALL_SUCCESS,
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

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  showSidebar: false,
  isEditing: false,
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  totalUsers: 0,
  numOfPagesAdmin: 1,

  //admin
  isUpdate: false,
  isDelete: false,

  methodDeathCount: 0,
  occupationDeathCount: 0,
  reasonDeathCount: 0,
  educationDeathCount: 0,
  methodAllDeathCount: [],
  reasonAllDeathCount: [],
  occupationAllDeathCount: [],
  educationAllDeathCount: [],
  allPDF: [],
  pdfCount: 0,
  pdfsNumOfPages: 0,
  pageAdmin: 1,

  searchMR: 'all',
  searchMRType: [
    'Economic Problems',
    'Employment Problems',
    'Problems Caused With The Elders',
    'Harrasment',
    'Love Affairs',
    'Sexual Harrassment',
    'Drugs',
    'Aggrieved Over The Death Parents',
    'Loss Of Property',
    'Failure At The Examination',
    'Mental disorders',
    'Chronic Diseases Physical Disabilities',
    'Other Reasons',
  ],
  searchTypeMR: 'all',
  searchTypeOptionsMR: ['Method', 'Reason'],
  sortMR: 'latest',
  sortOptionsMR: ['latest', 'oldest'],

  searchEDU: 'all',
  searchEDUType: ['School Not Attended', 'From Grade 1 To 7', 'Passed Grade 8', 'Passed OL', 'Passed AL', 'University Degree', 'Other'],
  searchTypeEDU: 'all',
  searchTypeOptionsEDU: ['Education', 'Occupation'],
  sortEDU: 'latest',
  sortOptionsEDU: ['latest', 'oldest'],

  allPDFEDU: [],
  pdfCountEDU: 0,
  pdfsNumOfPagesEDU: 0,
  numOfPagesEDU: 1,
  pageAdminEDU: 1,
  pageEDU: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: 'https://safesrilankaai-api.onrender.com/api/v1',
  });

  //request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  //store user details in local storage

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  };

  //remove user details in local storage when logout

  const removeFromTheLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  //register user

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post('https://safesrilankaai-api.onrender.com/api/v1/auth/register', currentUser);
      const { user, token } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  //login

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const response = await axios.post('https://safesrilankaai-api.onrender.com/api/v1/auth/login', currentUser);

      const { user, token } = response.data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(`https://safesrilankaai-api.onrender.com/api/v1/auth/${endPoint}`, currentUser);

      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      });

      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  //logOut

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeFromTheLocalStorage();
  };

  //password reset email verification

  const loginUserPasswordRest = async (email) => {
    dispatch({ type: LOGIN_PASSWORDREST });
    try {
      const response = await axios.post('https://safesrilankaai-api.onrender.com/api/v1/auth/login/frogetpassword', {
        email,
      });
      dispatch({
        type: LOGIN_PASSWORDREST_COMPLETE,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_PASSWORDREST_ERROR,
      });
    }
    clearAlert();
  };

  //new password

  const loginUserNewPassword = async (password, id, token) => {
    dispatch({ type: LOGIN_NEWPASSWORD });
    const newPassword = password;
    try {
      const response = await axios.post(`https://safesrilankaai-api.onrender.com/api/v1/auth/login/newpassword/${id}/${token}`, { newPassword });
      dispatch({
        type: LOGIN_NEWPASSWORD_COMPLETE,
        payload: { msg: response.data.msg },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_NEWPASSWORD_ERROR,
      });
    }
    clearAlert();
  };

  //update user
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch('https://safesrilankaai-api.onrender.com/auth/updateUser', currentUser);

      const { user, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  //predcit suicide method

  const predcitSuicideMethod = async (year, age, method) => {
    console.log('app', year, age, method);
    dispatch({ type: METHOD_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/method`, {
        year,
        age,
        method,
      });
      console.log('response', response.data.prediction);
      dispatch({
        type: METHOD_SUCCESS,
        payload: { deathCount: response.data.prediction },
      });
    } catch (error) {
      dispatch({
        type: METHOD_ERROR,
      });
    }
    clearAlert();
  };

  //predcit suicide methodall

  const predcitSuicideAllMethod = async (year, age) => {
    console.log('app', year, age);
    dispatch({ type: METHOD_ALL_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/allmethod`, {
        year,
        age,
      });
      dispatch({
        type: METHOD_ALL_SUCCESS,
        payload: { deathCount: response.data },
      });
    } catch (error) {
      dispatch({
        type: METHOD_ERROR,
      });
    }
    clearAlert();
  };

  //predcit reason

  const predcitReason = async (year, age, reason) => {
    dispatch({ type: REASON_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/reason`, {
        year,
        age,
        reason,
      });
      dispatch({
        type: REASON_SUCCESS,
        payload: { deathCount: response.data.prediction },
      });
    } catch (error) {
      dispatch({
        type: REASON_ERROR,
      });
    }
    clearAlert();
  };

  //predcit reasonall

  const predcitReasonAll = async (year, age, reasonvalue) => {
    dispatch({ type: REASON_ALL_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/allreason`, {
        year,
        age,
      });
      createPDFHistory(year, age, 'Reason', response.data, reasonvalue);
      dispatch({
        type: REASON_ALL_SUCCESS,
        payload: { deathCount: response.data },
      });
    } catch (error) {
      dispatch({
        type: REASON_ALL_ERROR,
      });
    }
    clearAlert();
  };

  //predcit occupation

  const predcitOccupation = async (year, age, occupation) => {
    dispatch({ type: OCCUPATION_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/occupation`, {
        year,
        age,
        occupation,
      });
      dispatch({
        type: OCCUPATION_SUCCESS,
        payload: { deathCount: response.data.prediction },
      });
    } catch (error) {
      dispatch({
        type: OCCUPATION_ERROR,
      });
    }
    clearAlert();
  };

  //predcit occupationall

  const predcitOccupationAll = async (year, age) => {
    dispatch({ type: OCCUPATION_ALL_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/alloccupation`, {
        year,
        age,
      });
      dispatch({
        type: OCCUPATION_ALL_SUCCESS,
        payload: { deathCount: response.data },
      });
    } catch (error) {
      dispatch({
        type: OCCUPATION_ALL_ERROR,
      });
    }
    clearAlert();
  };

  //predcit education

  const predcitEducation = async (year, age, education) => {
    dispatch({ type: EDUCATION_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/education`, {
        year,
        age,
        education,
      });
      console.log('response', response.data.prediction);
      dispatch({
        type: EDUCATION_SUCCESS,
        payload: {
          deathCount: response.data.prediction,
        },
      });
    } catch (error) {
      dispatch({
        type: EDUCATION_ERROR,
      });
    }
    clearAlert();
  };

  //predcit educationall

  const predcitEducationaAll = async (year, age, education) => {
    console.log('app', year, age);
    dispatch({ type: EDUCATION_ALL_BEGIN });
    try {
      const response = await axios.post(`https://myapipoorna-91bffc37d7b8.herokuapp.com/predict/alleducation`, {
        year,
        age,
      });
      createPDFHistoryEDU(year, age, 'Education', response.data, education);
      dispatch({
        type: EDUCATION_ALL_SUCCESS,
        payload: { deathCount: response.data },
      });
    } catch (error) {
      dispatch({
        type: EDUCATION_ALL_ERROR,
      });
    }
    clearAlert();
  };

  const createPDFHistory = async (year, age, type, reasonAllDeathCount, reasonvalue) => {
    dispatch({ type: CREATE_ALL_BEGIN });
    try {
      const response = await authFetch.post('/history', {
        year,
        age,
        type,
        reasonAllDeathCount,
        reasonvalue,
      });

      dispatch({
        type: CREATE_ALL_SUCCESS,
      });
    } catch (error) {
      console.log(error.response);
    }

    clearAlert();
  };

  const getPDFHistory = async () => {
    dispatch({ type: GET_ALL_BEGIN });
    const { searchMR, searchTypeMR, sortMR, pageAdmin } = state;
    let url = `/history?page=${pageAdmin}&type=${searchTypeMR}&sort=${sortMR}`;

    if (searchMR) {
      url = url + `&search=${searchMR}`;
    }
    try {
      const { data } = await authFetch.get(url);
      const { pdfs, pdfCount, pdfsNumOfPages } = data;

      dispatch({
        type: GET_ALL_SUCCESS,
        payload: {
          pdfs,
          pdfCount,
          pdfsNumOfPages,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const createPDFHistoryEDU = async (year, age, type, educationAllDeathCount, education) => {
    dispatch({ type: CREATE_ALL_BEGIN });
    try {
      const response = await authFetch.post('/history/edu', {
        year,
        age,
        type,
        educationAllDeathCount,
        education,
      });

      dispatch({
        type: CREATE_ALL_SUCCESS,
      });
    } catch (error) {
      console.log(error.response);
    }

    clearAlert();
  };

  const getPDFHistoryEDU = async () => {
    dispatch({ type: GETEDU_ALL_BEGIN });
    const { searchEDU, searchTypeEDU, sortEDU, pageAdminEDU } = state;
    let url = `/history/edu?page=${pageAdminEDU}&type=${searchTypeEDU}&sort=${sortEDU}`;

    if (searchEDU) {
      url = url + `&search=${searchEDU}`;
    }
    try {
      const { data } = await authFetch.get(url);
      const { pdfsEDU, pdfCountEDU, pdfsNumOfPagesEDU } = data;

      dispatch({
        type: GETEDU_SUCCESS,
        payload: {
          pdfsEDU,
          pdfCountEDU,
          pdfsNumOfPagesEDU,
        },
      });
    } catch (error) {
      console.log(error.response);
    }
    clearAlert();
  };

  const changePageEDU = (page) => {
    dispatch({ type: CHANGE_VLAUES_EDU, payload: { page } });
  };

  const clearValuesAdmin = () => {
    dispatch({ type: CLEAR_VALUES_ADMIN });
  };

  const clearValuesEDU = () => {
    dispatch({ type: CLEAR_VALUES_REASON });
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        loginUserPasswordRest,
        loginUserNewPassword,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        clearValuesAdmin,
        predcitSuicideMethod,
        predcitOccupation,
        predcitReason,
        predcitEducation,
        predcitSuicideAllMethod,
        predcitReasonAll,
        predcitOccupationAll,
        predcitEducationaAll,
        createPDFHistory,
        getPDFHistory,
        createPDFHistoryEDU,
        getPDFHistoryEDU,
        changePageEDU,
        clearValuesEDU,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };

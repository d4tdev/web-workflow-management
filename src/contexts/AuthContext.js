import React, { createContext, useReducer, useEffect, useState } from 'react';
import axios from 'axios';

import { authReducer } from 'reducers/authReducer';
import { API_ROOT } from 'utilities/constants';
import setAuthToken from 'utilities/setAuthToken';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [authState, dispatch] = useReducer(authReducer, {
      authLoading: true,
      isAuthenticated: false,
      user: null,
   });

   // Authenticate user
   const loadUser = async () => {
      if (localStorage['wfmg-login']) {
         setAuthToken(localStorage['wfmg-login']);
      }

      try {
         const response = await axios.get(`${API_ROOT}/v1/auth`, {
            withCredentials: true,
            credentials: 'include',
         });
         if (response.data.success) {
            dispatch({
               type: 'SET_AUTH',
               payload: { isAuthenticated: true, user: response.data.user },
            });
         }
      } catch (err) {
         localStorage.removeItem('wfmg-login');
         setAuthToken(null);
         dispatch({
            type: 'SET_AUTH',
            payload: { isAuthenticated: false, user: null },
         });
      }
   };

   useEffect(() => {
      const loadingUser = async () => await loadUser();
      loadingUser();
   }, []);

   // Login
   const loginUser = async (userForm) => {
      try {
         const response = await axios.post(
            `${API_ROOT}/v1/auth/login`,
            userForm,
            {
               withCredentials: true,
               credentials: 'include',
            }
         );
         if (response.data.success) {
            localStorage.setItem('wfmg-login', response.data.accessToken);
         }
         await loadUser();

         return response.data;
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message };
      }
   };

   // Register
   const registerUser = async (userForm) => {
      try {
         const response = await axios.post(
            `${API_ROOT}/v1/auth/register`,
            userForm,
            {
               withCredentials: true,
               credentials: 'include',
            }
         );
         if (response.data.success) {
            localStorage.setItem('wfmg-login', response.data.accessToken);
         }

         await loadUser();

         return response.data;
      } catch (error) {
         if (error.response.data) return error.response.data;
         else return { success: false, message: error.message };
      }
   };

   // Logout
   const logoutUser = () => {
      localStorage.removeItem('wfmg-login');
      dispatch({
         type: 'SET_AUTH',
         payload: { isAuthenticated: false, user: null },
      });
   };

   // Context data
   const authContextData = { loginUser, registerUser, logoutUser, authState };
   return (
      <AuthContext.Provider value={authContextData}>
         {children}
      </AuthContext.Provider>
   );
};

export default AuthContextProvider;

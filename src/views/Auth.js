import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import LoginForm from 'components/Auth/LoginForm';
import RegisterForm from 'components/Auth/RegisterForm';
import { AuthContext } from 'contexts/AuthContext';
import './Auth.scss';
import axios from 'axios';

const Auth = ({ authRoute }) => {
   const {
      authState: { authLoading, isAuthenticated },
   } = useContext(AuthContext);

   let body;
   if (authLoading) {
      body = (
         <div className='d-flex justify-content-center mt-2'>
            <Spinner
               style={{
                  color: '#41c375',
               }}
               animation='border'
               variant='info'
            />
         </div>
      );
   } else if (isAuthenticated) {
      return <Navigate to='/' />;
   } else {
      body = (
         <>
            {authRoute === 'login' && <LoginForm />}
            {authRoute === 'register' && <RegisterForm />}
         </>
      );
   }

   return (
      <div className='root'>
         <div className='form'>
            <div className='form__header'>
               <img
                  className='app-img'
                  src='https://cdn.discordapp.com/attachments/973812651308240928/1084709318047305828/iconApp.png'
               />
               <h3 className='app-title'>WFMG</h3>
            </div>
            {body}
         </div>
      </div>
   );
};

export default Auth;

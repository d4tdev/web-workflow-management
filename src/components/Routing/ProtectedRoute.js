import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'contexts/AuthContext';
import { Spinner } from 'react-bootstrap';

const ProtectedRoute = () => {
   const {
      authState: { authLoading, isAuthenticated },
   } = useContext(AuthContext);
   if (authLoading) {
      return (
         <div
            style={{
               height: '100vh',
               width: '100vw',
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
            }}>
            <Spinner
               style={{
                  color: '#41c375',
               }}
               animation='border'
               role='status'>
               <span className='sr-only'>Loading...</span>
            </Spinner>
         </div>
      );
   }

   return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;

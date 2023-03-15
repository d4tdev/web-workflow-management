import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from 'components/Home/Home';
import Auth from 'views/Auth';
import AuthContextProvider from 'contexts/AuthContext';
import ProtectedRoute from 'components/Routing/ProtectedRoute';

function App() {
   return (
      <AuthContextProvider>
         <Router>
            <Routes>
               <Route exact path='/' element={<ProtectedRoute />}>
                  <Route exact path='/' element={<Home />} />
               </Route>
               <Route
                  exact
                  path='/login'
                  element={<Auth authRoute='login' />}
               />
               <Route
                  exact
                  path='/register'
                  element={<Auth authRoute='register' />}
               />
            </Routes>
         </Router>
      </AuthContextProvider>
   );
}

export default App;

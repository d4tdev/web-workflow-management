import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import Home from 'components/Home/Home';
import Auth from 'views/Auth';
import AuthContextProvider from 'contexts/AuthContext';
import ProtectedRoute from 'components/Routing/ProtectedRoute';
import Boards from 'components/Boards/Boards';
import Contact from 'components/Boards/Contact';
import About from 'components/Boards/About';
import NotFound from 'components/NotFound/NotFound';

function App() {
   return (
      <AuthContextProvider>
         <Router>
            <Routes>
               <Route exact path='/board/:id' element={<ProtectedRoute />}>
                  <Route exact path='/board/:id' element={<Home />} />
               </Route>
               <Route exact path='/boards' element={<ProtectedRoute />}>
                  <Route exact path='/boards' element={<Boards />} />
               </Route>
               <Route exact path='/' element={<ProtectedRoute />}>
                  <Route exact path='/' element={<Boards />} />
               </Route>
               <Route exact path='/contact' element={<ProtectedRoute />}>
                  <Route exact path='/contact' element={<Contact />} />
               </Route>
               <Route exact path='/about' element={<ProtectedRoute />}>
                  <Route exact path='/about' element={<About />} />
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
               <Route exact path='*' element={<NotFound />} />
            </Routes>
         </Router>
      </AuthContextProvider>
   );
}

export default App;

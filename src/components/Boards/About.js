//custom components
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
   Container as BootstrapContainer,
   Row,
   Col,
   Form,
   Button,
} from 'react-bootstrap';

import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dragDrop';
import {
   fetchBoardDetails,
   createNewColumn,
   updateBoard,
   updateColumn,
   updateCard,
} from 'actions/ApiCall';

import '../../App.scss';
import './Boards.scss';
import '../Home/Home.scss';
import '../Home/BoardBar/BoardBar.scss';
import AppBar from 'components/Home/AppBar/AppBar';

function About() {
   return (
      <div className='About'>
         <AppBar menuLeft={false} />
         <nav className='navbar-board'>
            <BootstrapContainer>
               <Row>
                  <Col sm={3}>
                     <Link to='/boards'>Boards</Link>
                     <Link to='/about'>About</Link>
                     <Link to='/contact'>Contact</Link>
                     <br />
                  </Col>
                  <Col sm={8}>
                     About
                  </Col>
               </Row>
            </BootstrapContainer>
         </nav>
      </div>
   );
}

export default About;

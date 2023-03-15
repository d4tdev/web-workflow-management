import React, { useState, useEffect, useRef } from 'react';
import { Container, Draggable } from 'react-smooth-dnd';
import {
   Container as BootstrapContainer,
   Row,
   Col,
   Form,
   Button,
} from 'react-bootstrap';
import { isEmpty, cloneDeep, isEqual } from 'lodash';

import Column from 'components/Home/Column/Column';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dragDrop';
import {
   fetchBoardDetails,
   createNewColumn,
   updateBoard,
   updateColumn,
   updateCard,
} from 'actions/ApiCall';

import './BoardBar.scss';

function BoardBar() {
   const [boards, setBoards] = useState([]);
   const [newColumnTitle, setNewColumnTitle] = useState('');
   const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
   const toggleOpenNewColumnForm = () =>
      setOpenNewColumnForm(!openNewColumnForm);

   // if (isEmpty(boards)) {
   //    return (<nav className='navbar-board'>Board Bar</nav>));
   // }
   return (
      <nav className='navbar-board'>
         Board Bar
         <BootstrapContainer className='add-column-container'>
            {!openNewColumnForm && (
               <Row>
                  <Col
                     className='add-new-column'
                     onClick={toggleOpenNewColumnForm}>
                     <i className='fa fa-plus icon' /> Thêm bảng
                  </Col>
               </Row>
            )}
            {openNewColumnForm && (
               <Row>
                  <Col className='enter-new-column'>
                     <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Nhập tiêu đề bảng...'
                        className='input-enter-new-column'
                        // ref={newColumnInputRef}
                        // value={newColumnTitle}
                        onChange={(e) => setNewColumnTitle(e.target.value)}
                        // onKeyDown={(e) => e.key === 'Enter' && addNewColumn()}
                     />
                  </Col>
                  <Col>
                     <Button
                        variant='success'
                        size='sm'
                        //  onClick={addNewColumn}
                     >
                        Thêm bảng
                     </Button>
                     <span
                        className='cancel-icon'
                        onClick={toggleOpenNewColumnForm}>
                        <i className='fa fa-times icon' />
                     </span>
                  </Col>
               </Row>
            )}
         </BootstrapContainer>
      </nav>
   );
}

export default BoardBar;

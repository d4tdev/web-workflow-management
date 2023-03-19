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

import BoardContent from 'components/Home/BoardContent/BoardContent';
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

function BoardBar(props) {
   const { boardId } = props;
   // console.log(boardId);
   // react hooks
   const [boardTitle, setBoardTitle] = useState('');

   useEffect(() => {
      fetchBoardDetails(boardId).then((board) => {
         setBoardTitle(board.title);
      });
   }, [boardId]);

   return (
      <nav className='navbar-board'>
         <Container orientation='horizontal'>{boardTitle}</Container>
         {/* <BootstrapContainer className='add-column-container'>
            {!openNewBoardForm && (
               <Row>
                  <Col
                     className='add-new-column'
                     onClick={toggleOpenNewBoardForm}>
                     <i className='fa fa-plus icon' /> Thêm bảng
                  </Col>
               </Row>
            )}
            {openNewBoardForm && (
               <Row>
                  <Col className='enter-new-column'>
                     <Form.Control
                        size='sm'
                        type='text'
                        placeholder='Nhập tiêu đề bảng...'
                        className='input-enter-new-column'
                        ref={newBoardInputRef}
                        value={newBoardTitle}
                        onChange={(e) => setNewBoardTitle(e.target.value)}
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
                        onClick={toggleOpenNewBoardForm}>
                        <i className='fa fa-times icon' />
                     </span>
                  </Col>
               </Row>
            )}
         </BootstrapContainer> */}
      </nav>
   );
}

export default BoardBar;

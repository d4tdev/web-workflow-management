import React, { useState, useEffect, useRef } from 'react';
// import { Container } from 'react-smooth-dnd';
import { Container, Dropdown, Form } from 'react-bootstrap';

import {
   saveContentAfterPressEnter,
   selectAllInLineText,
} from 'utilities/contentEditable';
import { fetchBoardDetails, updateBoard } from 'actions/ApiCall';

import './BoardBar.scss';
import ConfirmModal from 'components/Common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import { useNavigate } from 'react-router-dom';

function BoardBar(props) {
   const { boardId } = props;
   // Router
   const navigate = useNavigate();
   // react hooks
   const [boardTitle, setBoardTitle] = useState('');
   const [board, setBoard] = useState({});

   useEffect(() => {
      fetchBoardDetails(boardId).then((board) => {
         console.log(board);
         setBoardTitle(board.title);
         setBoard(board);
      });
   }, [boardId]);

   const [showConfirmModal, setShowConfirmModal] = useState(false);
   const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

   // Remove board
   const onConfirmModalAction = (type) => {
      if (type === MODAL_ACTION_CONFIRM) {
         console.log(board);
         // remove board
         const newBoard = {
            _destroy: true,
         };

         // Call api
         updateBoard(board._id, newBoard).then(() => navigate('/boards'));
      }
      toggleShowConfirmModal();
   };

   const handleBoardTitleBlur = () => {
      if (boardTitle !== board.title) {
         const newBoard = {
            ...board,
            title: boardTitle,
         };
         // Call api
         updateBoard(newBoard._id, newBoard)
            .then((updatedBoard) => {
               setBoardTitle(updatedBoard.data.title);
               setBoard(updatedBoard.data);
            })
            .catch(() => {
               setBoardTitle(board.title);
               setBoard(board);
            });
      }
   };

   return (
      <nav className='navbar-board'>
         <Container orientation='horizontal'>
            <Form.Control
               size='sm'
               type='text'
               className='trello-content-editable'
               value={boardTitle}
               onChange={(e) => setBoardTitle(e.target.value)}
               onBlur={handleBoardTitleBlur}
               onKeyDown={saveContentAfterPressEnter}
               onClick={selectAllInLineText}
               onMouseDown={(e) => e.preventDefault()}
               spellCheck='false'
            />
         </Container>
         <div className='column-dropdown-actions'>
            <Dropdown>
               <Dropdown.Toggle
                  id='dropdown-basic'
                  size='sm'
                  className='dropdown-btn'
               />

               <Dropdown.Menu className='dropdown-menu'>
                  {/* <Dropdown.Item onClick={toggleOpenNewCardForm}>
                        Thêm thẻ
                     </Dropdown.Item> */}
                  <Dropdown.Item onClick={toggleShowConfirmModal}>
                     Xóa bảng
                  </Dropdown.Item>
                  {/* <Dropdown.Item>
                        Di chuyển tất cả các thẻ trong cột này (Đang phát triển)
                     </Dropdown.Item>
                     <Dropdown.Item>
                        Lưu trữ tất cả các thẻ trong cột này (Đang phát triển)
                     </Dropdown.Item> */}
               </Dropdown.Menu>
            </Dropdown>
         </div>
         <ConfirmModal
            show={showConfirmModal}
            onAction={onConfirmModalAction}
            title='Xóa cột'
            content={`Bạn có chắc chắn muốn xóa bảng <strong>${board.title}</strong>! <br/>Tất cả các cột và thẻ liên quan cũng sẽ bị xóa!`}
         />

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

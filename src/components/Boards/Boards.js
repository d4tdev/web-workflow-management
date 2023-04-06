//custom components
import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
   Container as BootstrapContainer,
   Row,
   Col,
   Form,
   Button,
   ListGroup,
} from 'react-bootstrap';

import {
   getAllBoards,
   createNewBoard,
   getDeletedBoards,
   updateBoard,
} from 'actions/ApiCall';

import ConfirmModal from 'components/Common/ConfirmModal';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import AppBar from 'components/Home/AppBar/AppBar';
import '../../App.scss';
import './Boards.scss';
import '../Home/Home.scss';
import '../Home/BoardBar/BoardBar.scss';
import { AuthContext } from 'contexts/AuthContext';

function Boards() {
   const {
      authState: {
         user: { _id },
      },
   } = useContext(AuthContext);

   const [boardsStatus, setBoardsStatus] = useState(true);
   const [boards, setBoards] = useState([]);
   const [newBoardTitle, setNewBoardTitle] = useState('');
   const [openNewBoardForm, setOpenNewBoardForm] = useState(false);
   const toggleOpenNewBoardForm = () => setOpenNewBoardForm(!openNewBoardForm);

   useEffect(() => {
      getAllBoards().then((boards) => {
         setBoards(boards);
      });
   }, []);

   const newBoardInputRef = useRef(null);
   useEffect(() => {
      if (newBoardInputRef && newBoardInputRef.current) {
         newBoardInputRef.current.focus();
         newBoardInputRef.current.select();
      }
   }, [openNewBoardForm]); // để khi biến giá trị openNewBoardForm thay đổi thì mới chạy useEffect

   // if (isEmpty(boards)) {
   //    return (<nav className='navbar-board'>Board Bar</nav>));
   // }
   let [boardId, setBoardId] = useState('');
   const handleClickBoardTitle = (e) => {
      setBoardId(e);
   };

   const addNewBoard = () => {
      if (newBoardTitle === '') {
         return;
      }
      const board = {
         title: newBoardTitle,
         userId: _id,
      };
      // setBoards([...boards, board]);
      setNewBoardTitle('');
      setOpenNewBoardForm(false);

      createNewBoard(board).then((board) => {
         // console.log(board);
         setBoards([...boards, board]);
      });
   };

   const handleSetBoards = (status) => {
      if (status === 'deleted') {
         if (boardsStatus === false) return;

         setActiveStatus(false);
         setActiveStatusDeleted(true);
         setBoardsStatus(false);
         getDeletedBoards().then((boards) => {
            setBoards(boards);
         });
      } else {
         if (boardsStatus === true) return;

         setActiveStatus(true);
         setActiveStatusDeleted(false);
         setBoardsStatus(true);
         getAllBoards().then((boards) => {
            setBoards(boards);
         });
      }
   };
   const [activeStatus, setActiveStatus] = useState(true);
   const [activeStatusDeleted, setActiveStatusDeleted] = useState(false);

   // Restore board
   const [boardIdRestore, setBoardIdRestore] = useState('');
   const [showConfirmModal, setShowConfirmModal] = useState(false);
   const toggleShowConfirmModal = (id) => {
      setShowConfirmModal(!showConfirmModal);
      setBoardIdRestore(id);
   };
   const onConfirmModalAction = (type) => {
      if (type === MODAL_ACTION_CONFIRM) {
         // remove board
         const newBoard = {
            _destroy: false,
         };

         // Call api
         updateBoard(boardIdRestore, newBoard).then((board) => {
            setBoards(boards.filter((board) => board._id !== boardIdRestore));
         });
      }
      toggleShowConfirmModal();
   };

   return (
      <div className='Boards'>
         <AppBar menuLeft={false} />
         <nav className='navbar-boards'>
            <BootstrapContainer>
               <Row>
                  <Col sm={3} className='nav-left h-auto'>
                     <BootstrapContainer className='add-column-container'>
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
                                    onChange={(e) =>
                                       setNewBoardTitle(e.target.value)
                                    }
                                    onKeyDown={(e) =>
                                       e.key === 'Enter' && addNewBoard()
                                    }
                                 />

                                 <Button
                                    className='btn-add-new-column'
                                    variant='success'
                                    size='sm'
                                    onClick={addNewBoard}>
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
                     </BootstrapContainer>
                     <div className='crossbar'></div>
                     <ListGroup as='ul' className=' mx-lg-4'>
                        <ListGroup.Item
                           as='li'
                           className='boards-choice'
                           active={activeStatus}
                           onClick={() => handleSetBoards('all')}>
                           <i className='fa fa-star icon' /> Bảng
                        </ListGroup.Item>
                        <ListGroup.Item
                           as='li'
                           className='boards-choice'
                           active={activeStatusDeleted}
                           onClick={() => handleSetBoards('deleted')}>
                           <i className='fa-solid fa-trash icon'></i> Bảng đã
                           lưu trữ
                        </ListGroup.Item>
                     </ListGroup>
                  </Col>
                  {!boardsStatus && (
                     <Col sm={7}>
                        <Row className='boards-content'>
                           CÁC BẢNG ĐÃ LƯU TRỮ (ĐÃ XÓA)
                        </Row>
                        <Row className='d-flex'>
                           {boards.map((board, index) => {
                              return (
                                 <Link
                                    // to={`/board/${board._id}`}
                                    key={board._id}
                                    onClick={() =>
                                       toggleShowConfirmModal(board._id)
                                    }>
                                    <BootstrapContainer
                                       orientation='horizontal'
                                       className='board-title'>
                                       {board.title}
                                    </BootstrapContainer>
                                    <ConfirmModal
                                       show={showConfirmModal}
                                       onAction={onConfirmModalAction}
                                       title='Khôi phục'
                                       content={`Bạn có chắc chắn muốn khôi phục bảng <strong>${board.title}</strong>!`}
                                    />
                                 </Link>
                              );
                           })}
                        </Row>
                     </Col>
                  )}
                  {boardsStatus && (
                     <Col sm={7}>
                        <Row className='boards-content'>
                           CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
                        </Row>
                        <Row className='d-flex'>
                           {boards.map((board, index) => {
                              return (
                                 <Link
                                    to={`/board/${board._id}`}
                                    key={board._id}
                                    onClick={() =>
                                       handleClickBoardTitle(board._id)
                                    }>
                                    <BootstrapContainer
                                       orientation='horizontal'
                                       className='board-title'>
                                       {board.title}
                                    </BootstrapContainer>
                                 </Link>
                              );
                           })}
                        </Row>
                     </Col>
                  )}
               </Row>
            </BootstrapContainer>
         </nav>
      </div>
   );
}

export default Boards;

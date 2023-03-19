//custom components
import React, { useState, useEffect, useRef, useContext } from 'react';
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
   
   const [boards, setBoards] = useState([]);
   const [newBoardTitle, setNewBoardTitle] = useState('');
   const [openNewBoardForm, setOpenNewBoardForm] = useState(false);
   const toggleOpenNewBoardForm = () => setOpenNewBoardForm(!openNewBoardForm);

   useEffect(() => {
      const boards = [
         { id: '63f74c073b43e235a2891123', title: 'board1' },
         { id: '63f74c073b43e235a2891487', title: 'board2' },
      ];

      setBoards(boards);
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
         columns: [],
      };
      setBoards([...boards, board]);
      setNewBoardTitle('');
      setOpenNewBoardForm(false);

      // createNewBoard(board).then((board) => {
      //    setBoards([...boards, board]);
      //    setNewBoardTitle('');
      //    setOpenNewBoardForm(false);
      // });
   };
   return (
      <div className='Boards'>
         <AppBar menuLeft={false} />
         <nav className='navbar-boards'>
            <BootstrapContainer>
               <Row>
                  <Col sm={3}>
                     {/* <Link to='/boards'>Boards</Link>
                     <Link to='/about'>About</Link>
                     <Link to='/contact'>Contact</Link>
                     <br /> */}

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
                                    // onKeyDown={(e) => e.key === 'Enter' && addNewBoard()}
                                 />

                                 <Button
                                    className='btn-add-new-column'
                                    variant='success'
                                    size='sm'
                                    //  onClick={addNewBoard}
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
                     </BootstrapContainer>
                  </Col>
                  <Col sm={7}>
                     <Row className='boards-content'>
                        CÁC KHÔNG GIAN LÀM VIỆC CỦA BẠN
                     </Row>
                     <Row className='d-flex'>
                        {boards.map((board, index) => {
                           return (
                              <Link
                                 to={`/board/${board.id}`}
                                 key={board.id}
                                 onClick={() =>
                                    handleClickBoardTitle(board.id)
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
               </Row>
            </BootstrapContainer>
         </nav>
      </div>
   );
}

export default Boards;

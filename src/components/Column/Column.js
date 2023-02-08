import React, { useState, useEffect, useRef } from 'react';
const { Container, Draggable } = require('react-smooth-dnd');
import { Dropdown, Form, Button } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import './Column.scss';
import Card from 'components/Card/Card';
import ConfirmModal from 'components/Common/ConfirmModal';
import { mapOrder } from 'utilities/sorts';
import { MODAL_ACTION_CONFIRM } from 'utilities/constants';
import {
   saveContentAfterPressEnter,
   selectAllInLineText,
} from 'utilities/contentEditable';

function Column(props) {
   const { column, onCardDrop, onUpdateColumn } = props;
   const cards = mapOrder(column.cards, column.cardOrder, 'id');

   const [showConfirmModal, setShowConfirmModal] = useState(false);
   const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal);

   const [columnTitle, setNewColumnTitle] = useState('');

   const [openNewCardForm, setOpenNewCardForm] = useState(false);
   const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

   const [newCardTitle, setNewCardTitle] = useState('');

   useEffect(() => {
      setNewColumnTitle(column.title);
   }, [column.title]);

   const newCardTextareaRef = useRef(null);
   // focus and select the new card text area when the new card is selected
   useEffect(() => {
      if (newCardTextareaRef && newCardTextareaRef.current) {
         newCardTextareaRef.current.focus();
         newCardTextareaRef.current.select();
      }
   }, [openNewCardForm]);

   const onConfirmModalAction = type => {
      if (type === MODAL_ACTION_CONFIRM) {
         // remove column
         const newColumn = {
            ...column,
            _destroy: true,
         };

         onUpdateColumn(newColumn);
      }
      toggleShowConfirmModal();
   };

   const handleColumnTitleBlur = () => {
      const newColumn = {
         ...column,
         title: columnTitle,
      };

      onUpdateColumn(newColumn);
   };

   const addNewCard = () => {
      if (!newCardTitle) {
         newCardTextareaRef.current.focus();
         return;
      }

      const newCardToAdd = {
         id: `card-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
         title: newCardTitle.trim(),
         column: column.id,
         boardId: column.boardId,
         cover: null,
      };

      let newColumn = cloneDeep(column);
      newColumn.cards.push(newCardToAdd);
      newColumn.cardOrder.push(newCardToAdd.id);

      onUpdateColumn(newColumn);
      setNewCardTitle('');
      toggleOpenNewCardForm();
   };

   return (
      <div className='column'>
         <header className='column-drag-handle'>
            <div className='column-title'>
               <Form.Control
                  size='sm'
                  type='text'
                  className='trello-content-editable'
                  value={columnTitle}
                  onChange={e => setNewColumnTitle(e.target.value)}
                  onBlur={handleColumnTitleBlur}
                  onKeyDown={saveContentAfterPressEnter}
                  onClick={selectAllInLineText}
                  onMouseDown={e => e.preventDefault()}
                  spellCheck='false'
               />
            </div>
            <div className='column-dropdown-actions'>
               <Dropdown>
                  <Dropdown.Toggle
                     id='dropdown-basic'
                     size='sm'
                     className='dropdown-btn'
                  />

                  <Dropdown.Menu className='dropdown-menu'>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>
                        Add Card...
                     </Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>
                        Remove Column...
                     </Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>
                        Move all cards in this column (beta)...
                     </Dropdown.Item>
                     <Dropdown.Item onClick={toggleShowConfirmModal}>
                        Archive all cards in this column (beta)...
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </div>
         </header>
         <div className='card-list'>
            <Container
               // onDragStart={e => console.log('drag started', e)}
               // onDragEnd={e => console.log('drag end', e)}
               // onDragEnter={e => console.log('drag enter:', e)}
               // onDragLeave={e => console.log('drag leave:', e)}
               // onDropReady={p => console.log('Drop ready: ', p)}

               orientation='vertical' // default orientation
               groupName='col' // cho phep keo tha qua cac column khi co cung groupName nhu the
               onDrop={dropResult => onCardDrop(column.id, dropResult)}
               dragClass='card-ghost'
               dropClass='card-ghost-drop'
               s
               /* A function that returns the payload of the child at the given index. */
               getChildPayload={index => cards[index]}
               dropPlaceholder={{
                  animationDuration: 150,
                  showOnTop: true,
                  className: 'card-drop-preview',
               }}
               dropPlaceholderAnimationDuration={200}>
               {cards.map((card, index) => (
                  <Draggable key={index}>
                     <Card card={card} />
                  </Draggable>
               ))}
            </Container>
            {openNewCardForm && (
               <div className='add-new-card-area'>
                  <Form.Control
                     size='sm'
                     as='textarea'
                     rows='3'
                     placeholder='Enter the title for this card..'
                     className='textarea-enter-new-card'
                     ref={newCardTextareaRef}
                     value={newCardTitle}
                     onChange={e => setNewCardTitle(e.target.value)}
                     onKeyDown={e => e.key === 'Enter' && addNewCard()}
                  />
               </div>
            )}
         </div>
         <footer>
            {openNewCardForm && (
               <div className='add-new-card-actions'>
                  <Button variant='success' size='sm' onClick={addNewCard}>
                     Add card
                  </Button>
                  <span className='cancel-icon' onClick={toggleOpenNewCardForm}>
                     <i className='fa fa-times icon' />
                  </span>
               </div>
            )}
            {!openNewCardForm && (
               <div className='footer-actions' onClick={toggleOpenNewCardForm}>
                  <i className='fa fa-plus icon' /> Add another card
               </div>
            )}
         </footer>

         <ConfirmModal
            show={showConfirmModal}
            onAction={onConfirmModalAction}
            title='Remove column'
            content={`Are you sure you want to remove <strong>${column.title}</strong>! <br/>All related cards will also be removed!`}
         />
      </div>
   );
}

export default Column;

import React, { useState, useEffect } from 'react';
const { Container, Draggable } = require('react-smooth-dnd');
import { Dropdown, Form } from 'react-bootstrap';

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

   useEffect(() => {
      setNewColumnTitle(column.title);
   }, [column.title]);

   const onConfirmModalAction = type => {
      if (type === MODAL_ACTION_CONFIRM) {
         // remove column
         const newColumn = {
            ...column,
            _destroy: true
         }

         onUpdateColumn(newColumn);
      }
      toggleShowConfirmModal();
   };

   const handleColumnTitleBlur = () => {
      const newColumn = {
         ...column,
         title: columnTitle
      }

      onUpdateColumn(newColumn)
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
         </div>
         <footer>
            <div className='footer-actions'>
               <i className='fa fa-plus icon' /> Add another card
            </div>
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

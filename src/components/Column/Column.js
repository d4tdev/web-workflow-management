import React from 'react';
const { Container, Draggable } = require('react-smooth-dnd');

import './Column.scss';
import Card from 'components/Card/Card';
import { mapOrder } from 'utilities/sorts';

function Column(props) {
   const { column } = props;
   const cards = mapOrder(column.cards, column.cardOrder, 'id');

   const onCardDrop = dropResult => {
      console.log(dropResult);
   };

   return (
      <div className='column'>
         <header className='column-drag-handle'>{column.title}</header>
         <div className='card-list'>
            <Container
               // onDragStart={e => console.log('drag started', e)}
               // onDragEnd={e => console.log('drag end', e)}
               // onDragEnter={e => console.log('drag enter:', e)}
               // onDragLeave={e => console.log('drag leave:', e)}
               // onDropReady={p => console.log('Drop ready: ', p)}

               orientation='vertical' // default orientation
               groupName='col' // cho phep keo tha qua cac column khi co cung groupName nhu the
               onDrop={onCardDrop}
               dragClass='card-ghost'
               dropClass='card-ghost-drop'
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
         <footer>Add another card</footer>
      </div>
   );
}

export default Column;

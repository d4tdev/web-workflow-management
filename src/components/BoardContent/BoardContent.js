import React, { useState, useEffect } from 'react';
const { Container, Draggable } = require('react-smooth-dnd');
import { isEmpty } from 'lodash';

import './BoardContent.scss';
import Column from 'components/Column/Column';
import { initialData } from 'actions/initialData';
import { mapOrder } from 'utilities/sorts';
import { applyDrag } from 'utilities/dragDrop';

function BoardContent() {
   // react hooks
   const [board, setBoard] = useState({});
   const [columns, setColumns] = useState([]);

   useEffect(() => {
      const boardFromDB = initialData.boards.find(
         board => board.id === 'board-1'
      );
      if (boardFromDB) {
         setBoard(boardFromDB);

         // sort column
         setColumns(
            mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id')
         );
      }
   }, []);

   if (isEmpty(board)) {
      return (
         <div className='not-found' style={{ padding: '10px', color: 'white' }}>
            Board not found!
         </div>
      );
   }

   const onColumnDrop = dropResult => {
      /* Creating a new array with the same values as the old array. */
      let newColumns = [...columns];
      newColumns = applyDrag(newColumns, dropResult);

      let newBoard = { ...board };
      newBoard.columnOrder = newColumns.map(c => c.id);
      newBoard.columns = newColumns;

      setColumns(newColumns);
      setBoard(newBoard);
   };

   const onCardDrop = (columnId, dropResult) => {
      if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
         /* Creating a new array with the same values as the old array. */
         let newColumns = [...columns];

         let currentColumn = newColumns.find(c => c.id === columnId);
         currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
         currentColumn.cardOrder = currentColumn.cards.map(c => c.id);

         setColumns(newColumns);
      }
   };

   return (
      <div className='board-content'>
         <Container
            orientation='horizontal'
            /* A function that is called when a column is dropped. */
            onDrop={onColumnDrop}
            /* A function that returns the payload of the child at the given index. */
            getChildPayload={index => columns[index]}
            dragHandleSelector='.column-drag-handle'
            dropPlaceholder={{
               animationDuration: 150,
               showOnTop: true,
               className: 'column-drop-preview',
            }}>
            {columns.map((column, index) => (
               <Draggable
                  /* A unique identifier for each column. */
                  key={index}>
                  <Column column={column} onCardDrop={onCardDrop} />
               </Draggable>
            ))}
         </Container>
         <div className='add-new-column'>
            <i className='fa fa-plus icon' /> Add another column
         </div>
      </div>
   );
}

export default BoardContent;

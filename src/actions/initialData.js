export const initialData = {
   boards: [
      {
         id: 'board-1',
         columnOrder: ['column-1', 'column-2', 'column-3'],
         columns: [
            {
               id: 'column-1',
               boardId: 'board-1',
               title: 'To Do',
               cardOrder: ['card-1', 'card-2', 'card-3', 'card-4'],
               cards: [
                  {
                     id: 'card-1',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Title: DD4TJ',
                     cover: 'https://picsum.photos/200/300',
                  },
                  {
                     id: 'card-2',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Hello from the world!',
                     cover: null
                  },
                  {
                     id: 'card-3',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Hello from the world!',
                     cover: null
                  },
                  {
                     id: 'card-4',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Hello from the world!',
                     cover: null
                  },
               ],
            },
            {
               id: 'column-3',
               boardId: 'board-1',
               title: 'To Do 3',
               cardOrder: ['card-12', 'card-13', 'card-14', 'card-15'],
               cards: [
                  {
                     id: 'card-12',
                     boardId: 'board-1',
                     columnId: 'column-3',
                     title: 'Title: DD4TJ',
                     cover: 'https://picsum.photos/200/300',
                  },
                  {
                     id: 'card-13',
                     boardId: 'board-1',
                     columnId: 'column-3',
                     title: 'Hello from the world! 3',
                     cover: null
                  },
                  {
                     id: 'card-14',
                     boardId: 'board-1',
                     columnId: 'column-3',
                     title: 'Hello from the world! 3',
                     cover: null
                  },
                  {
                     id: 'card-15',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Hello from the world! 3',
                     cover: null
                  },
               ],
            },
            {
               id: 'column-2',
               boardId: 'board-1',
               title: 'To Do 2',
               cardOrder: ['card-8', 'card-9', 'card-10', 'card-11'],
               cards: [
                  {
                     id: 'card-8',
                     boardId: 'board-1',
                     columnId: 'column-2',
                     title: 'Title: DD4TJ',
                     cover: 'https://picsum.photos/200/300',
                  },
                  {
                     id: 'card-9',
                     boardId: 'board-1',
                     columnId: 'column-2',
                     title: 'Hello from the world! 2',
                     cover: null
                  },
                  {
                     id: 'card-10',
                     boardId: 'board-1',
                     columnId: 'column-2',
                     title: 'Hello from the world! 2',
                     cover: null
                  },
                  {
                     id: 'card-11',
                     boardId: 'board-1',
                     columnId: 'column-1',
                     title: 'Hello from the world! 2',
                     cover: null
                  },
               ],
            },
         ],
      },
   ],
};

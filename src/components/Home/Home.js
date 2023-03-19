//custom components
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import AppBar from 'components/Home/AppBar/AppBar';
import BoardBar from 'components/Home/BoardBar/BoardBar';
import BoardContent from 'components/Home/BoardContent/BoardContent';

import './Home.scss';

function Home() {
   const { id } = useParams();
   return (
      <div className='Home'>
         <AppBar menuLeft={true} />
         <BoardBar boardId={id} />
         <BoardContent boardId={id} />
      </div>
   );
}

export default Home;

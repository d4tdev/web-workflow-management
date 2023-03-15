//custom components
import React from 'react';

import AppBar from 'components/Home/AppBar/AppBar';
import BoardBar from 'components/Home/BoardBar/BoardBar';
import BoardContent from 'components/Home/BoardContent/BoardContent';

import './Home.scss';

function Home() {
   return (
      <div className="Home">
         <AppBar />
         <BoardBar />
         <BoardContent />
      </div>
   );
}

export default Home;

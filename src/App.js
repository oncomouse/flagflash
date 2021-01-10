import React from 'react';
import Score from './features/score/Score';
import Question from './features/question/Question';
import './App.css';

const App = () => {
  return (
    <div className='container'>
      <Score />
      <Question />
    </div>
  );
};

export default App;
// vim:ft=javascriptreact

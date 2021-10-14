import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import TicTacToe from './TicTacToe';

function App(){
  return (
    <div className="App">
      <TicTacToe/>
    </div>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App/>,rootElement)
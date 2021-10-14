import React, { memo, useState } from 'react'
import classNames from 'classnames' 
import './TicTacToe.scss'

const Square = memo(({value,onClick,index})=>{
  return (
    <button className="Square" onClick={()=>onClick(index)}>
      {value}
    </button>
  )
})

const calculateWinner = (squares) => {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  let winner = lines.reduce((memo,[a,b,c])=>{
    if(squares[a] && squares[a] === squares[b] && squares[b] === squares[c]){
      memo = squares[a]
    }
    return memo
  },"")
  if(!winner && squares.every(s=>s)){
    winner = 'tie'
  }
  return winner
}

const Board = ({squares,onCLick}) => {
  return (
    <div className="Board">
      {squares.map((square,i)=>(
        <Square key={i} index={i} value={square} onClick={onCLick}/>
      ))}
    </div>
  )
}

const Announcement = ({winner,onStart}) => {
  return (
    <div className="Announcement">
      {winner === 'tie' ? (
        <div>Tie Game</div>
      ):(
        <div>
          <div>Congrat</div>
          <div>{winner}</div>
        </div>
      )}
      <button className="Button" onClick={onStart}>
        Start
      </button>
    </div>
  )
}

const Message = ({hasStarted,isXNext}) => {
  return (
    <div className="Message">
      {hasStarted
        ? isXNext
          ? "It's Xs turn"
          : "It's Os turn"
        : "Click to start game"
      }
    </div>
  )
}

const Game = () => {
  const [squares,setSquares] = useState(Array(9).fill(null))
  const [isXNext,setIsXNext] = useState(true)
  const [winner,setWinner] = useState("")

  function handleClick(i){
    const moves = [...squares]
    moves[i] = isXNext ? 'X':'O'
    setSquares(moves)
    setIsXNext(!isXNext)
    const winner = calculateWinner(moves)
    if(winner) setWinner(winner)
  }

  function handleStart(){
    setSquares(Array(9).fill(null))
    setWinner(null)
  }

  return (
    <div className={classNames("Game",{"Game--winner":!!winner})}>
      <Board squares={squares} onCLick={handleClick}/>
      <Message hasStarted={squares.some(s=>s)} isXNext={isXNext}/>
      {!!winner && <Announcement winner={winner} onStart={handleStart}/>}
    </div>
  )
}

export default Game

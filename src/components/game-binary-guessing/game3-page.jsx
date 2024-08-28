import React from 'react';
import './game3-page.css'
import { useState,useRef,useEffect } from 'react';


const Game3Page = () => {
  const [gameState,setGameState]=useState('instruction')
  const [max,setMax]=useState(100)
  const [min,setMin]=useState(0)
  const [num,setNum]=useState(Math.round(Math.random()*(max-min)+min))
  const [guessCounter,setGuessCounter]=useState(0)
  const startMode2 = () => {
    setGameState('playing');
  }
  const lowerBtn = () => {
    setMax(() => {
      const newMax = num - 1;
      setNum(Math.round(Math.random() * (newMax - min) + min));
      return newMax;
    });
    setGuessCounter(prev => prev + 1);
  };
  
  const higherBtn = () => {
    setMin(() => {
      const newMin = num + 1;
      setNum(Math.round(Math.random() * (max - newMin) + newMin));
      return newMin;
    });
    setGuessCounter(prev => prev + 1);
  };
  const youWin=()=>{
    setGameState('end')
  }
 
  return (
    <>
    <div className='containerMain'>

    {gameState==='instruction'&&(
      <div className='endContainer'><h1>choose a number from 1-100 and click start when you are ready!</h1>
      <button className='btns' onClick={()=>startMode2()}>START!</button></div>
    )}
    {gameState==='playing'&&(
      <>
      <div className='theCointainer'>
        <button className='btns' onClick={()=>higherBtn()}>&#8593;<br/>my number is higher</button>
        <div className='pcsNum' >{num}</div>
        <button className='btns' onClick={()=>lowerBtn()}>my number is lower<br/>&darr;</button>
      </div>
        <button className='endBtn btns' onClick={()=>youWin()}>You've got it!</button>
      </>
    )}
    {gameState === 'end' && (
    <div className="endContainer">
    <h2>Congratulations! You've won!</h2>
    <p>The number was: <span className="greenNumber">{num}</span></p>
    <p>Number of attempts: {guessCounter}</p>
    <button className="btns endBtn" onClick={() => {
      setGameState('instruction');
      setMax(100);
      setMin(0);
      setNum(Math.round(Math.random() * 100));
      setGuessCounter(0);
    
    }}>
      Wanna play again?
    </button>
  </div>
)}
  </div>
    </>
  );
};

export default Game3Page;

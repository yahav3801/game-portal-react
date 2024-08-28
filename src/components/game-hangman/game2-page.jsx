import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './game2-page.css';
import Gallow0 from '../../assests/hangman-imgs/0.png';
import Gallow1 from '../../assests/hangman-imgs/1.png';
import Gallow2 from '../../assests/hangman-imgs/2.png';
import Gallow3 from '../../assests/hangman-imgs/3.png';
import Gallow4 from '../../assests/hangman-imgs/4.png';
import Gallow5 from '../../assests/hangman-imgs/5.png';
import Gallow6 from '../../assests/hangman-imgs/6.png';


const Game2Page = () => {
  const [subject, setSubject] = useState('');
  const [answer, setAnswer] = useState('');
  const [answerPlaceholder, setAnswerPlaceholder] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameState, setGameState] = useState('choosing');
  const navigate = useNavigate()
  const DishesArr = [
    "Pizza", "Burger", "Pasta", "Sushi", "Tacos", "Lasagna", "Salmon", "Steak", "Ramen", "Curry",
    "Salad", "Chili", "Risotto", "Falafel", "Empanada", "Cake", "Donut", "Pancake", "Shawarma",
    "Waffles", "Kebab", "Tortilla", "Pudding", "Hummus", "Omelette"
  ];

  const CitiesArr = [
    "Mykonos", "Tokyo", "London", "Paris", "Madrid", "Beijing", "Moscow", "Dubai", "Chicago",
    "Athens", "Shanghai", "Singapore", "Washington", "Sydney", "Istanbul", "Berlin", "Rome",
    "Seoul", "Toronto", "Mumbai", "Haifa", "Bangkok", "Amsterdam", "Barcelona", "Jerusalem"
  ];

  const AnimalsArr = [
    "Dog", "Cat", "Elephant", "Lion", "Tiger", "Bear", "Giraffe", "Monkey", "Horse", "Bird",
    "Dolphin", "Whale", "Penguin", "Kangaroo", "Snake", "Wolf", "Fox", "Rabbit", "Deer",
    "Panda", "Squirrel", "Zebra", "Cheetah", "Gorilla", "Eagle"
  ];

  const chooseSubject = (selectedSubject) => {
    setSubject(selectedSubject);
    let selectedArray;
    switch (selectedSubject) {
      case 'Cities':
        selectedArray = CitiesArr;
        break;
      case 'Animals':
        selectedArray = AnimalsArr;
        break;
      case 'Dishes':
        selectedArray = DishesArr;
        break;
      default:
        selectedArray = [];
    }
    const newAnswer = selectedArray[Math.floor(Math.random() * selectedArray.length)].toLowerCase();
    setAnswer(newAnswer);
    console.log(newAnswer);
    setAnswerPlaceholder(Array(newAnswer.length).fill('_'));
    setGameState('playing');
  };

  const checkLetter = (letter) => {
    if (answer.includes(letter)) {
      const newPlaceholder = [...answerPlaceholder];
      for (let i = 0; i < answer.length; i++) {
        if (answer[i] === letter) {
          newPlaceholder[i] = letter;
        }
      }
      setAnswerPlaceholder(newPlaceholder);

      if (!newPlaceholder.includes('_')) {
        setGameState('won');
      }
    } else {
      setMistakes(prev => prev + 1);
   
      if (mistakes + 1 >= 6) {
        setGameState('lost');
       
      }
    }
  };

  return (
    <div className="hangman-container">
      
      {gameState === 'choosing' && (
        <div className="options-container">
          <h1 className="headline">Choose a subject:</h1>
          <button onClick={() => chooseSubject('Animals')}>Animals</button>
          <button onClick={() => chooseSubject('Cities')}>Cities</button>
          <button onClick={() => chooseSubject('Dishes')}>Dishes</button>
        </div>
      )}
      
      {gameState !== 'choosing' && (
        <div className="mid-container">
          <div className="word-container">{answerPlaceholder.join(' ')}</div>
          <div className="draw-container">
            <img className='gallow' src={[Gallow0, Gallow1, Gallow2, Gallow3, Gallow4, Gallow5, Gallow6][mistakes]} alt='Gallow' />
          </div>
        </div>
      )}
      
      {gameState === 'playing' && (
        <div className="keyBoard-container">
          {'abcdefghijklmnopqrstuvwxyz'.split('').map(letter => (
            <button key={letter} className='button' onClick={() => checkLetter(letter)}>{letter}</button>
          ))}
        </div>
      )}
      
      {gameState === 'won' && <div><h2>Congratulations! You won!</h2><button className='resetBtn' onClick={()=>navigate('/home-page')}>PLAY AGAIN!</button></div>}
      {gameState === 'lost' && <div><h2>Game Over. The word was: {answer}</h2><button className='resetBtn' onClick={()=>navigate('/home-page')}>PLAY AGAIN!</button></div>}
    </div>
  );
};

export default Game2Page;
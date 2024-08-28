import "./game1-page.css";
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Game1Page = () => {
  const navigate = useNavigate();
  const [nxtBtnDisplay, setNxtBtnDisplay] = useState('none');
  const answersRef = useRef(null);
  const nxtbtnRef = useRef(null);
  const [currQuestion, setCurrQuestion] = useState([
    {
      question: 'Choose a subject',
      answers: [ 
        {text: 'Animals 🐾', correct:false},
        {text: 'Film 🎬', correct:false},
        {text: 'History 📜', correct:false},
        {text: 'Food 🍴', correct:true}
      ]
    }
  ]);

  const questions = [[
    {
        question: 'What bird has a brain smaller than its eyes?',
        answers: [ 
        {text: 'Penguin', correct:false},
        {text: 'Pigeon', correct:false},
        {text: 'Flamingo', correct:false},
        {text: 'Ostrich', correct:true}]
    },
    {
        question: 'What is the name of the biggest shark?',
answers: [ {text: 'Great white shark', correct:false},
        {text: 'Whale shark', correct:true},
        {text: 'Tiger shark', correct:false},
        {text: 'Basking shark', correct:false}]
    },
    {
        question: 'Which animal has the most powerful bite in the world?',
answers: [ {text: 'Hippo', correct:false},
        {text: 'Bengal tiger', correct:false},
        {text: 'Saltwater crocodile', correct:true},
        {text: 'Great white shark', correct:false}]
    },
    {
        question: 'What color is octopus blood?',
answers: [ {text: 'Black', correct:false},
        {text: 'Red', correct:false},
        {text: 'White', correct:false},
        {text: 'Blue', correct:true}]
    }

],[
{
question: 'How many movies are there in the Marvel Cinematic Universe?',
answers: [ 
{text: '28', correct:false},
{text: '41', correct:false},
{text: '33', correct:true},
{text: '24', correct:false}]
},
{
question: 'In The Matrix, what color are the two pills that Morpheus gives Neo to choose between?',
answers: [ {text: 'Black and White', correct:false},
{text: 'Purple and Orange', correct:false},
{text: 'Green and Yellow', correct:false},
{text: 'Red and blue', correct:true}]
},
{
question: 'What was the first israeli movie to be nominated for the Oscars award?',
answers: [ {text: 'Escimo leemon', correct:false},
{text: 'Kazablan', correct:false},
{text: 'Hashoter Azulai', correct:true},
{text: 'Givaat halfon eina ona', correct:false}]
},
{
question: `Sargent Donny Donowitz, played by Eli Roth, was known for savagely beating Nazi soldiers to death with a baseball bat. His brutality earned him the nickname "the ______ Jew"; what was Donny's nickname?`,
answers: [ {text: 'bear', correct:true},
{text: 'wild', correct:false},
{text: 'scarred', correct:false},
{text: 'worst', correct:false}]
}
],[
{
question: 'How many years did the "One Hundred Years War" last?',
answers: [ 
{text: '100', correct:false},
{text: '98', correct:false},
{text: '116', correct:true},
{text: '109', correct:false}]
},
{
question: 'What country lost the most lives in World War II?',
answers: [ {text: 'Japan', correct:false},
{text: 'Soviet Union', correct:true},
{text: 'Germany', correct:false},
{text: 'United Kingdom', correct:false}]
},
{
question: 'Which American president was in power during the "Black Thursday" Wall Street crash?',
answers: [ {text: 'Herbert Hoover', correct:true},
{text: 'Franklin D.Roosevelt', correct:false},
{text: 'John F.Kennedy', correct:false},
{text: 'Calvin Coolidge', correct:false}]
},
{
question: 'Who was the first Israeli to win a Nobel prise?',
answers: [ {text: 'Menahem Begin', correct:false},
{text: 'Shimon Peres', correct:false},
{text: 'Shai Agnon', correct:true},
{text: 'Itzhak Rabin', correct:false}]
}
],[
{
question: "How many hamburgers does McDonald's sell a day?",
answers: [ 
{text: '6.5 million', correct:true},
{text: '4.2 million', correct:false},
{text: '900 thousand', correct:false},
{text: '1.8 million', correct:false}]
},
{
question: 'Which country is the biggest exporter of coffee beans worldwide?',
answers: [ {text: 'Honduras', correct:false},
{text: 'Vietnam', correct:false},
{text: 'Colombia', correct:false},
{text: 'Brazil', correct:true}]
},
{
question: 'What condiment was used for its medicinal qualities in the 1800s?',
answers: [ {text: 'Curry', correct:false},
{text: 'Mayonnaise', correct:false},
{text: 'Mustard', correct:false},
{text: 'Ketchup', correct:true}]
},
{
question: "What's the most stolen grocery item?",
answers: [ {text: 'Bread', correct:false},
{text: 'Cheese', correct:true},
{text: 'Meat', correct:false},
{text: 'Fruits', correct:false}]
}
]]
  let score = 0;
  let currentQuestionIndex = 0;
  let selectSubjectIndex = 0;

  const chosenSubject0 = () => {
    selectSubjectIndex = 0;
    startQuiz();
  };

  const chosenSubject1 = () => {
    selectSubjectIndex = 1;
    startQuiz();
  };

  const chosenSubject2 = () => {
    selectSubjectIndex = 2;
    startQuiz();
  };

  const chosenSubject3 = () => {
    selectSubjectIndex = 3;
    startQuiz();
  };

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
  }

  function showQuestion() {
    resetState();
    let currentQuestion = questions[selectSubjectIndex][currentQuestionIndex];
    setCurrQuestion([currentQuestion]);
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerHTML = answer.text;
      button.classList.add('btn');
      answersRef.current.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
    });
  }

  function resetState() {
    setNxtBtnDisplay('none');
    while (answersRef.current.firstChild) {
      answersRef.current.removeChild(answersRef.current.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
    } else {
      selectedBtn.classList.add('wrong');
    }
    Array.from(answersRef.current.children).forEach(button => {
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      }
      button.disabled = true;
    });
    setNxtBtnDisplay('block');
  }

  function showScore() {
    resetState();
    setCurrQuestion([{ 
      question: `You scored ${score} out of ${questions[selectSubjectIndex].length}!`,
      answers: []
    }]);
    if (nxtbtnRef.current) {
      nxtbtnRef.current.innerHTML = 'Play Again';
      nxtbtnRef.current.onclick = () => navigate('/home-page');
    }
    setNxtBtnDisplay('block');
  }

  const handleNextButton = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions[selectSubjectIndex].length) {
      showQuestion();
    } else {
      showScore();
    }
  };

  useEffect(() => {
    if (nxtbtnRef.current) {
      nxtbtnRef.current.addEventListener('click', handleNextButton);
    }
    return () => {
      if (nxtbtnRef.current) {
        nxtbtnRef.current.removeEventListener('click', handleNextButton);
      }
    };
  }, []);

  return (
    <>
      <div className="container">
        <div id="question-container">
          <div id="question">{currQuestion[0].question}</div>
          <div id="answer-buttons" ref={answersRef} className="btn-grid">
            <button className="btn" onClick={() => { chosenSubject0() }} id="btn1">{currQuestion[0].answers[0]?.text}</button>
            <button className="btn" onClick={() => { chosenSubject1() }} id="btn2">{currQuestion[0].answers[1]?.text}</button>
            <button className="btn" onClick={() => { chosenSubject2() }} id="btn3">{currQuestion[0].answers[2]?.text}</button>
            <button className="btn" onClick={() => { chosenSubject3() }} id="btn4">{currQuestion[0].answers[3]?.text}</button>
          </div>
        </div>
        <div className="controls">
          <button id="next-btn" className="next-btn btn hide" style={{ display: nxtBtnDisplay }} ref={nxtbtnRef}>Next</button>
        </div>
      </div>
    </>
  );
};

export default Game1Page;
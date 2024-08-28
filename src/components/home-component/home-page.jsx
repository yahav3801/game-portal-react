import './home-page.css'
import gameImgOne from '../../assests/imgs/quiz_Screenshot_1.png'
import gameImgTwo from '../../assests/imgs/hangman_Screenshot_2.png'
import gameImgThree from '../../assests/imgs/binary quessing_Screenshot_1.png'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from '../../contexts/userContext';
const HomePage = () => {
  const { currUser, setCurrUser } =useContext(UserContext)
  const navigate = useNavigate();
    const QuizGame=()=>{
      navigate('/quiz')
    }
    const HangManGame=()=>{
      navigate('/hangman')
    }
    const BinaryGuessingGame =()=>{
      navigate('/binary-guessing')
    }
  return (
    <>
    
    <main className='mainGames'>
    <div className="custom-card horizontal-card" onClick={QuizGame}>
    <img src={gameImgOne} alt="Game" className="card-img-left" />
    <div className="card-body">
      <h5 className="card-title">QUIZ FOR GENIUSES!</h5>
      <p className="card-text">
        Text your knowledge in varius subjects, and prove your parents you are NOT a failure!
      </p>
      
    </div>
  </div>
    <div className="custom-card horizontal-card" onClick={HangManGame}>
    <img src={gameImgTwo} alt="Game" className="card-img-left" />
    <div className="card-body">
      <h5 className="card-title">HANGMAN TIME!</h5>
      <p className="card-text">
        A life of a man that should be hanged CAN be saved if you guess the right word! (hopefully you fail) 
      </p>
      
    </div>
  </div>
    <div className="custom-card horizontal-card" onClick={BinaryGuessingGame}>
    <img src={gameImgThree} alt="Game" className="card-img-left" />
    <div className="card-body">
      <h5 className="card-title">BINARY GUESSING</h5>
      <p className="card-text">
        Pretty simple YOU choose a number from 1-100 and I will guess it! lets see how fast i can get it!
      </p>
      
    </div>
  </div>
    
    </main>
    </>
  );
};

export default HomePage;

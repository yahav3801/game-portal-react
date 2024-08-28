import './sign-page.css';
import { useState, useContext } from 'react';
import { login, signup } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import logoPic from '../../assests/imgs/logo.png'
import UserContext from '../../contexts/userContext';

const SignComponent = () => {
  const navigate = useNavigate();
  const { users, setCurrUser, addUser } = useContext(UserContext);
  const [action, setAction] = useState('Sign up');
  const [invalidMsg, setInvalidMsg] = useState('');
  const [formData, setFormData] = useState({ nick: '', password: '', email: '', profilePic: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({
        ...formData,
        profilePic: reader.result 
      });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLogin = () => {
    if (formData.nick.length === 0) {
      setInvalidMsg('Username must be longer than 0 characters');
      return;
    }
    const loginResult = login(formData.nick, formData.password, users);
    ifValidLogin(loginResult);
    ifInvalidLogin(loginResult);
  };

  const ifValidLogin = ({ loggedIn, user }) => {
    if (loggedIn) {
      setCurrUser({ id: user.id, nick: formData.nick, role: user.role, profilePic: user.profilePic, password:formData.password, email:user.email });
      setFormData({ nick: '', password: '', email: '', profilePic: null });
      navigate('/Home-Page');
    }
  };

  const ifInvalidLogin = ({ loggedIn, msg }) => {
    if (!loggedIn) {
      setInvalidMsg(msg);
    }
  };

  const handleSignup = () => {
    const signupResult = signup(formData.nick, formData.password, formData.email, users, addUser, formData.profilePic);
    if (signupResult.registered) {
      setAction('Log in');
    } else {
      setInvalidMsg(signupResult.msg);
    }
  };

  const handleGuestLogin = () => {
    const guestUser = { id: '', nick: 'Guest', role: 'guest' };
    setCurrUser(guestUser);
    localStorage.setItem('game-portal-user', JSON.stringify(guestUser));
    navigate('/Home-Page');
  };

  return (
    <div className='sign-component'>
      <img src={logoPic} style={{width:'15%'}} alt="Logo" />
      <div className="header">{action}</div>
      <div className="user-name">
        <input type="text" placeholder='Enter name' name="nick" required onChange={handleChange} />
      </div>
      <div className="user-email" style={{ display: action === 'Log in' ? 'none' : 'flex' }}>
        <input type="email" placeholder='Enter email' name="email" required onChange={handleChange} />
      </div>
      <div className="user-password">
        <input type="password" placeholder='Enter password' name="password" required onChange={handleChange} />
      </div>
      <div style={{ display: action === 'Sign up' ? 'none' : 'flex' }} className='forgot-password'>
        Forgot your password? <span style={{ color: 'blue' }}> click here!</span>
      </div>
      <label htmlFor="file-input" className={'labelStyle'} style={{ display: action === 'Log in' ? 'none' : 'inline-block'}}>
        Click here to add a Profile Picture!
      </label>
      <input type="file" name="profilePic" onChange={handleFileChange} accept="image/*" id="file-input" style={{ display: 'none' }} />
      <div className="buttons">
        <div style={{ color: 'red' }}>{invalidMsg}</div>
        <button
          className={action === 'Sign up' ? 'active' : ''}
          onClick={() => {
            action === 'Sign up' ? handleSignup() : setAction('Sign up');
          }}
        >
          Sign Up
        </button>
        <button
          className={action === 'Log in' ? 'active' : ''}
          onClick={() => {
            action === 'Log in' ? handleLogin() : setAction('Log in');
          }}
        >
          Log in
        </button>
        <button onClick={handleGuestLogin}>
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default SignComponent;

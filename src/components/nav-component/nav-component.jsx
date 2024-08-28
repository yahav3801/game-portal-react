import './nav-component.css'
import React, { useContext,useState } from 'react';
import Logo from '../../assests/imgs/logo2.png'
import UserContext from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const NavBar = () =>{
    
    const { currUser,setCurrUser } = useContext(UserContext);
    const [popUpDisplay, setPopUpDisplay] = useState('none');
    const navigate = useNavigate()
    const location = useLocation();
    const togglePopUp = () => {
      // e.preventDefault();
      setPopUpDisplay(prevState => prevState === 'none' ? 'block' : 'none');
    }
    const handleLogout = () =>{
        setCurrUser(null)
        localStorage.removeItem('game-portal-user')
        navigate('/')
    }
    const Profile = ()=>{
        navigate(`/profile/${currUser.nick}`)
    }
    const Admin=()=>{
        navigate('/admin')
    }
    const Home=()=>{
        navigate('/home-page')
    }
    if (location.pathname === '/') {
      return null
    }
   return  <nav>
      <div className='logo' onClick={Home}>
        <img className='logoImg' src={Logo} alt="Logo" />
      </div>
      <div>
        
        <div className='profilePic'onClick={togglePopUp}>{currUser.role!=='guest'&&<img style={{ width: '40px', height: '40px', objectFit: 'cover'}}  src={currUser.profilePic} alt="Profile" />}{currUser.nick} &darr;</div>
        <div className='popUp' style={{display:popUpDisplay}}>
        {(currUser.role === 'admin' || currUser.role === 'user') && (<div className='adminPopup' onClick={Profile}>Edit Profile</div>)}
          <div onClick={handleLogout}>Logout</div>
          {currUser.role === 'admin' && (<div className='adminPopup' onClick={Admin}>Admin</div>)}
        </div>
      </div>
    </nav>
}
export default NavBar;
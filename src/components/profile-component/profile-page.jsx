import './profile-page.css';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/userContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currUser, setCurrUser, users } = useContext(UserContext);
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({
    nick: currUser.nick || '',
    email: currUser.email || '',
    password: currUser.password || '',
    profilePic: currUser.profilePic || '',
    description: currUser.description || '',
    country: currUser.country || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profilePic: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isNickTaken = users.some(user => 
      user.nick === formData.nick && user.id !== currUser.id
    );
  
    const isEmailTaken = users.some(user => 
      user.email === formData.email && user.id !== currUser.id
    );
  
    if (isNickTaken) {
      setErrorMsg('Nickname is already taken');
      return;
    }
  
    if (isEmailTaken) {
      setErrorMsg('Email is already taken');
      return;
    }
  

    const updatedUser = {
      ...currUser,
      ...formData
    };
  
    const updatedUsers = users.map(user =>
      user.id === currUser.id ? updatedUser : user
    );
  
    localStorage.setItem('game-portal-players', JSON.stringify(updatedUsers));
    setCurrUser(updatedUser);
    localStorage.setItem('game-portal-user', JSON.stringify(updatedUser));
    setErrorMsg('');
    alert('Profile updated successfully');
    navigate('/home-page');
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="nick" className="form-label">Nickname:</label>
          <input type="text" name='nick' id="nick" value={formData.nick} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">Password:</label>
          <input type="text" name='password' id="password" value={formData.password} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input type="email" name='email' id="email" value={formData.email} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="profilePic" className="form-label">Profile Picture:</label>
          {formData.profilePic && (
            <img src={formData.profilePic} alt="Profile Preview" className="profile-pic-preview" style={{ width: '100px', height: '100px', objectFit: 'cover'}}/>
          )}
          <input type="file" name='profilePic' id="profilePic" onChange={handleFileChange} accept="image/*" className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea name='description' id="description" value={formData.description} onChange={handleChange} className="form-input" />
        </div>
        <div className="form-group">
          <label htmlFor="country" className="form-label">Country:</label>
          <input type="text" name='country' id="country" value={formData.country} onChange={handleChange} className="form-input" />
        </div>
        <div className="error-message" style={{color:'red'}}>{errorMsg}</div>
        <button type='submit' className="submit-button">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfilePage;
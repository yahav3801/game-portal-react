import React,{useContext} from 'react';
import UserContext from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import './admin-page.css'

const AdminPage = () => {
  const navigate = useNavigate()
  const { users, setUsers, currUser, setCurrUser }=useContext(UserContext)


  const handleDelete = (userId)=>{
    if (userId===currUser.id) {
      setCurrUser(null)
        localStorage.removeItem('game-portal-user')
        alert(`you will now be logged out`)
        navigate('/')
    }
    const updatedUsers = users.filter(user => user.id !== userId)
    setUsers(updatedUsers)
    localStorage.setItem('game-portal-players', JSON.stringify(updatedUsers))
    alert(`user ID:${userId} is now deleted`)
  }

  const handleMakeAdmin = (userId)=>{
    const updatedUsers = users.map(user=>user.id === userId ? { ...user, role: 'admin' } : user)
    setUsers(updatedUsers)
    localStorage.setItem('game-portal-players', JSON.stringify(updatedUsers))
    alert(`user ID:${userId} is now admin`)
  }
  return (
     <div className="users-container">
      <div className="navbar-spacer"></div> 
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <img
            className="profile-pic"
            src={user.profilePic}
            alt="No Profile Picture"
          />
          <div className="user-details">
            <div className="user-info">
              <div className="user-info-label">Nickname:</div>
              <div>{user.nick}</div>
            </div>
            <div className="user-info">
              <div className="user-info-label">ID:</div>
              <div>{user.id}</div>
            </div>
            <div className="user-info">
              <div className="user-info-label">Email:</div>
              <div>{user.email}</div>
            </div>
            <div className="user-info">
              <div className="user-info-label">Description:</div>
              <div>{user.description}</div>
            </div>
            <div className="user-info">
              <div className="user-info-label">Country:</div>
              <div>{user.country}</div>
            </div>
          </div>
          <div className='admin-buttons'>
            <button onClick={()=>handleDelete(user.id)}>Delete User</button>
            <button onClick={()=>handleMakeAdmin(user.id)}>Make Admin</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;

import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NotFoundPage from './components/notFound-component/notFound-page';
import SignPage from './components/sign-component/Sign-page';
import HomePage from './components/home-component/home-page';
import GameQuiz from './components/game-quiz/game1-page'
import GameHangman from './components/game-hangman/game2-page'
import GameBinaryGuessing from './components/game-binary-guessing/game3-page'
import ProfilePage from './components/profile-component/profile-page'
import AdminPage from './components/admin-component/admin-page'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import AccessDenied from './components/accessDenied/accessDenied'
import UserContext from './contexts/userContext';
import NavBar from './components/nav-component/nav-component';

const App = () => {
  const [users, setUsers] = useState(localStorage.getItem('game-portal-players') ?
    JSON.parse(localStorage.getItem('game-portal-players')) : [
      { id: 0, nick: 'admin', password: "admin123", email: 'admin@gmail.com', role: 'admin' },
      { id: 1, nick: 'jondoe', password: "jondoe123", email: 'jondoe@gmail.com', role: 'user' }
    ]);

  const [currUser, setCurrUser] = useState(localStorage.getItem('game-portal-user') ?
    JSON.parse(localStorage.getItem('game-portal-user')) : { id: undefined, role: 'guest', nick: '' });

  const addUser = (newUser) => {
    const newUsers = [...users, newUser];
    setUsers(newUsers);
    localStorage.setItem('game-portal-players', JSON.stringify(newUsers));
  };

  useEffect(() => {
    localStorage.setItem('game-portal-user', JSON.stringify(currUser));
  }, [currUser]);

  useEffect(() => {
    localStorage.setItem('game-portal-players', JSON.stringify(users));
  }, [users]);

  return (
    <UserContext.Provider value={{ currUser, setCurrUser, users, addUser, setUsers }}>
      <NavBar/>
        <Routes>
            <Route path="/" index element={<SignPage />} />
                    <Route  path="/Home-Page" element={<HomePage />}/>
                    <Route path="/profile/:nick" element={<ProfilePage/>}/>
                      <Route element={<ProtectedRoutes requiredRole={'admin'}></ProtectedRoutes>}>
                            <Route path='/admin'  element={ <AdminPage/>}/>
                      </Route>
                    <Route path='/Quiz' element={<GameQuiz/>}/>
                    <Route path='/Hangman' element={<GameHangman/>}/>
                    <Route path='/Binary-guessing' element={<GameBinaryGuessing/>}/>
                
          <Route path="*" element={<NotFoundPage />} />
          <Route path='/access-denied' element={<AccessDenied/>}/>
        </Routes>
      
    </UserContext.Provider>
  );
};

export default App;

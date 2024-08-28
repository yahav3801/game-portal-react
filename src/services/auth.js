import { v4 as uuid } from 'uuid';

export function signup(nick, password, email, users, addUser, profilePic) {
    console.log(users);
    if (users.some(user => user.nick === nick)) {
        return { registered: false, msg: `User with nick ${nick} already exists` };
    }

    
    const newUser = { id: uuid(), nick, password, email, role: 'user', profilePic};
    
    console.log(newUser);
    addUser(newUser);
    return { registered: true, user: newUser };
}

export function login(nick, password, users) {
    if (!users.some(user => user.nick === nick)) {
        return { loggedIn: false, msg: `No user with nick ${nick}` };
    }

    let user = users.find(user => user.nick === nick);

    if (user.password !== password) {
        return { loggedIn: false, msg: `Wrong password for the user ${nick}` };
    }

    localStorage.setItem('game-portal-user', JSON.stringify({ id: user.id, role: user.role, nick:user.nick, profilePic: user.profilePic, email: user.email}));
    return { loggedIn: true, user };
}

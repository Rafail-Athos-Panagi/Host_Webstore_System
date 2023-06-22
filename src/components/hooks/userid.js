import { createContext } from 'react';

const UserID = createContext({
    userID: null,
    setUserID: () => {}
});

export default UserID;
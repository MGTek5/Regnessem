import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  authed: false,
  setUser: () => {},
  setAuthed: () => {},
});

export default UserContext;

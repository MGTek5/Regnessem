import { createContext } from 'react';

const UserContext = createContext({
  user: null,
  authed: false,
});

export default UserContext;

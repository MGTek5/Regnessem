import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../contexts/user.context';

const Logout = () => {
  const history = useHistory();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (history && userContext) {
      setTimeout(() => {
        localStorage.removeItem('regnessem-token');
        localStorage.removeItem('regnessem-user');
        userContext.user = null;
        userContext.authed = false;
        history.push('/login');
      }, 2500);
    }
  }, [history, userContext]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <img
        alt="bye"
        className="w-full h-full"
        src="https://c.tenor.com/UQOlboL7W5cAAAAC/harry-potter-bye-bye.gif"
      />
    </div>
  );
};

export default Logout;

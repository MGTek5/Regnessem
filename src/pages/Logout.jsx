import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    if (history) {
      setTimeout(() => {
        localStorage.removeItem('regnessem-token');
        localStorage.removeItem('regnessem-user');
        history.push('/login');
      }, 2500);
    }
  }, [history]);

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

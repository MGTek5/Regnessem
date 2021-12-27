import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import UserModel from '../types/user';

const Picto = ({
  members,
  className,
}) => {
  const DEFAULT_PIC = '/defaultPic.jpeg';
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(members);
  }, [members]);

  const getOpacityClass = () => (
    `opacity-${Math.trunc(100 / filteredUsers.length)}`
  );

  return (
    <div className={className}>
      {filteredUsers.map((user) => (
        <img
          alt=""
          src={user.profileGif || DEFAULT_PIC}
          key={user.profileGif || `${Math.random()}-random-id-picto`}
          className={`absolute ${getOpacityClass()} h-full w-full top-0 left-0 rounded-full`}
        />
      ))}
    </div>
  );
};

Picto.propTypes = {
  members: Proptypes.arrayOf(UserModel).isRequired,
  className: Proptypes.string,
};

Picto.defaultProps = {
  className: 'relative h-12 w-12',
};

export default Picto;

import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import UserModel from '../types/user';

const Picto = ({
  members,
}) => {
  const DEFAULT_PIC = '/defaultPic.jpeg';
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // TODO exclude connected user and randomize array
    setFilteredUsers(members);
  }, [members]);

  const getOpacityClass = () => (
    `opacity-${Math.trunc(100 / filteredUsers.length)}`
  );

  return (
    <div className="relative h-12 w-12">
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
};

Picto.defaultProps = {};

export default Picto;

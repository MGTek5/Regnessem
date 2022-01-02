import React from 'react';
import Proptypes from 'prop-types';
import UserModel from '../types/user';

const Picto = ({
  members,
  className,
}) => {
  const DEFAULT_PIC = '/defaultPic.jpeg';

  const getOpacity = () => (
    `${Math.trunc(100 / members.length)}%`
  );

  return (
    <div className={className}>
      {members.map((user) => (
        <img
          alt=""
          src={user.profileGif || DEFAULT_PIC}
          key={user.profileGif || `${Math.random()}-random-id-picto`}
          className="absolute h-full w-full top-0 left-0 rounded-full"
          style={{ opacity: getOpacity() }}
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

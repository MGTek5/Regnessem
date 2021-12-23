import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MessageModel from '../types/message';
import Picto from './Picto';

const Message = ({
  message,
}) => {
  const [fromConnectedUser, setFromConnectedUser] = useState(true);

  useEffect(() => {
    // TODO set to true if message.auth._id match connected user
    setFromConnectedUser(!!Math.round(Math.random()) % 2);
    console.log(fromConnectedUser);
  }, []); // eslint-disable-line

  const getContainerStyle = () => {
    const common = 'flex items-end p-2 justify-end';
    let style = '';

    if (fromConnectedUser) {
      style = 'flex-row';
    } else {
      style = 'flex-row-reverse';
    }

    return [common, style].join(' ');
  };

  const getMessageStyle = () => {
    const common = 'flex items-end p-2 rounded-md shadow-md m-2 justify-end w-2/5';
    let style = '';

    if (fromConnectedUser) {
      style = 'bg-pupule-700 flex-row';
    } else {
      style = 'bg-gray-900 flex-row-reverse';
    }

    return [common, style].join(' ');
  };

  return (
    <div className={getContainerStyle()}>
      <div className={getMessageStyle()}>
        <img alt={message._id} src={message.message} className="w-full" />
      </div>
      <Picto className="h-6 w-6 mb-3 relative" members={[message.author]} />
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.instanceOf(MessageModel).isRequired,
};

Message.defaultProps = {};

export default Message;

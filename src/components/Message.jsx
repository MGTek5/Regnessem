import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MessageModel from '../types/message';
import Picto from './Picto';
import UserContext from '../contexts/user.context';

const Message = ({
  message,
}) => {
  const [fromConnectedUser, setFromConnectedUser] = useState(false);
  const userContext = useContext(UserContext);

  useEffect(() => {
    setFromConnectedUser(message.author._id === userContext.user._id);
  }, [userContext.user._id, message.author._id]);

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
      <Picto className="h-6 w-6 mb-4 relative" members={[message.author]} />
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.instanceOf(MessageModel).isRequired,
};

Message.defaultProps = {};

export default Message;

import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import PropTypes from 'prop-types';
import MessageModel from '../types/message';
import Picto from './Picto';
import UserContext from '../contexts/user.context';
import useIntersection from '../hooks/useIntersectionObserver';

const Message = ({
  message,
  chatRef,
}) => {
  const [fromConnectedUser, setFromConnectedUser] = useState(false);
  const userContext = useContext(UserContext);
  const [isInView, setIsInView] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const imgRef = useRef();

  useEffect(() => {
    setFromConnectedUser(message.author._id === userContext.user._id);
  }, [userContext.user._id, message.author._id]);

  useIntersection(imgRef, () => {
    setIsInView(true);
  });

  useEffect(() => {
    const { clientWidth } = chatRef.current;
    if (message.width === 0) {
      const width = clientWidth * 0.45;
      setSize({ width: Math.trunc(width), height: undefined });
    } else {
      const width = clientWidth * 0.45;
      const height = (width * message.height) / message.width;
      setSize({ width: Math.trunc(width), height: Math.trunc(height) });
    }
  }, [chatRef, message]);

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
      style = 'bg-slate-900 flex-row-reverse';
    }

    return [common, style].join(' ');
  };

  const getTooltipStyle = () => {
    const common = 'tooltip';
    let style = '';
    if (fromConnectedUser) {
      style = 'tooltip-left';
    } else {
      style = 'tooltip-right';
    }
    return [common, style].join(' ');
  };

  const handleLoadingComplete = () => {
  };

  return (
    <div className={getContainerStyle()} ref={imgRef}>
      <div className={getMessageStyle()}>
        {hasFailed && <img alt="not found" src="/not-available.gif" className="w-full" width="498" height="280" />}
        {isInView && !hasFailed && <img alt={message._id} src={message.message} width={size.width} height={size.height} className="w-full" onLoad={handleLoadingComplete} onError={() => setHasFailed(true)} />}
      </div>
      <div className={getTooltipStyle()} data-tip={message.author.username}>
        <Picto className="h-6 w-6 mb-4 relative" members={[message.author]} />
      </div>
    </div>
  );
};

Message.propTypes = {
  message: MessageModel.isRequired,
  chatRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
};

Message.defaultProps = {};

export default Message;

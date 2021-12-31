import React from 'react';
import propTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Message from '../../components/Message';
import Sad from '../../components/images/Sad';

const Chat = ({
  messages, chatRef, selectedChat, chats, hasNewMessage, setHasNewMessage, scrollToBottom,
}) => {
  const [t] = useTranslation();
  const getCurrentChatName = () => (
    chats.find((chat) => chat._id === selectedChat).name
  );

  const getCurrentChatUsernames = () => (
    chats.find((chat) => chat._id === selectedChat).members.map((member) => member.username)
  );

  return (
    <div className="w-full h-full p-0 lg:pb-3 flex flex-col">
      {!messages.length
        ? (
          <div className="h-full w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl">{t('home.nothingToShow')}</h2>
            <h3 className="text-l">{t('home.sendMessage')}</h3>
            <Sad className="h-24 mt-8" />
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="p-5 w-full flex justify-between items-center">
              <span className="font-bold mr-5">{getCurrentChatName()}</span>
              <span className="text-sm italic">{`(${getCurrentChatUsernames().join(', ')})`}</span>
            </div>
            {
              hasNewMessage
              && (
                <div className="alert alert-info sticky top-2 my-1 mx-2">
                  <div className="flex flex-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-6 h-6 mx-2 stroke-current">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p>{t('home.newMessageAlert')}</p>
                  </div>
                  <button
                    className="self-end hover:underline"
                    type="button"
                    onClick={() => {
                      setHasNewMessage(false);
                      scrollToBottom();
                    }}
                  >
                    {t('home.navigateToMessage')}
                  </button>
                </div>
              )
            }
            <div ref={chatRef} className="flex flex-col overflow-y-auto overflow-x-hidden scrollbar-w-2 lg:scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
              {messages.map((message) => (
                <Message
                  key={message._id}
                  message={message}
                  chatRef={chatRef}
                />
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

Chat.propTypes = {
  messages: propTypes.arrayOf(propTypes.shape({ _id: propTypes.string })).isRequired,
  chatRef: propTypes.oneOfType([
    propTypes.func,
    propTypes.shape({ current: propTypes.instanceOf(Element) }),
  ]).isRequired,
  selectedChat: propTypes.string.isRequired,
  chats: propTypes.arrayOf(
    propTypes.shape({ _id: propTypes.string, name: propTypes.string }),
  ).isRequired,
  hasNewMessage: propTypes.bool.isRequired,
  setHasNewMessage: propTypes.func.isRequired,
  scrollToBottom: propTypes.func.isRequired,

};

export default Chat;

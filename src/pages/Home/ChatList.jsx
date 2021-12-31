import React from 'react';
import { useTranslation } from 'react-i18next';
import propTypes from 'prop-types';
import Plus from '../../components/images/Plus';
import Picto from '../../components/Picto';
import Trash from '../../components/images/Trash';

const ChatList = ({
  setNewChatModalOpen, chats, notifiedChats, handleChatChange, deleteChat, selectedChat,
}) => {
  const [t] = useTranslation();
  return (
    <div className="w-1/5 lg:block hidden">
      <div className="flex w-full p-4 border-b items-center">
        <button type="button" className="outline-none p-1 flex items-center justify-between w-full" onClick={() => setNewChatModalOpen(true)}>
          <span className="flex items-center font-bold">{t('home.new')}</span>
          <Plus className="w-6 h-6 bg-pupule rounded-full p-1" />
        </button>
      </div>
      <div className="pr-3 overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
        {chats.map((chat) => (
          <div className="indicator w-full" key={chat._id}>
            <div
              className={'flex w-full rounded-xl m-1 focus:outline-none group '.concat(selectedChat === chat._id ? 'bg-pupule-900' : 'hover:bg-pupule-400')}
            >
              {notifiedChats.includes(chat._id) && <div className="indicator-item badge badge-secondary" />}
              <button
                type="button"
                className="flex items-center pl-2 py-2 w-full text-white outline-none"
                onClick={() => handleChatChange(chat._id)}
              >
                <Picto members={chat.members} />
                <span className="ml-3">{chat.name}</span>
              </button>
              <button
                type="button"
                className="ml-2 pr-3 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => {
                  // TODO: add confirm alert (maybe swal2)
                  deleteChat({
                    variables: {
                      chatId: chat._id,
                    },
                  });
                }}
              >
                <Trash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

ChatList.propTypes = {
  setNewChatModalOpen: propTypes.func.isRequired,
  handleChatChange: propTypes.func.isRequired,
  deleteChat: propTypes.func.isRequired,
  notifiedChats: propTypes.arrayOf(propTypes.string).isRequired,
  selectedChat: propTypes.string.isRequired,
  chats: propTypes.arrayOf(propTypes.shape({
    _id: propTypes.string,
    name: propTypes.string,
    members: propTypes.arrayOf(
      propTypes.shape({ _id: propTypes.string, username: propTypes.string }),
    ),
  })).isRequired,
};

export default ChatList;

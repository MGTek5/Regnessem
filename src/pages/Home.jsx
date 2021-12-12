import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GET_USERS, GET_CHATS } from '../utils/graphql';
import Plus from '../components/images/Plus';
import NewChatModal from '../components/NewChatModal';

const Home = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const { data: usersData } = useQuery(GET_USERS);
  const { data: chatsData } = useQuery(GET_CHATS);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.getUsers);
    }
    if (chatsData) {
      setChats(chatsData.getChats);
      if (selectedChat === null) {
        setSelectedChat(chatsData.getChats[0]._id);
      }
    }
  }, [usersData, chatsData, selectedChat]);

  const getChatIcon = (chat) => (
    // TODO pick the first picture that don't belong to the connected user
    // TODO use defaultPic.jpeg as default
    chat.members[0].profileGif
  );

  return (
    <div className="flex h-full bg-gray-800">
      <div className="w-1/5 flex flex-col shadow-md">
        <div className="flex w-full p-4 border-b items-center justify-between">
          <span className="flex items-center font-bold">{t('home.new')}</span>
          <button type="button" className="bg-pupule outline-none p-1 rounded-full" onClick={() => setNewChatModalOpen(true)}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
        {chats.map((chat) => (
          <button
            type="button"
            className={'flex items-center pl-2 py-2 text-white outline-none rounded-xl m-1 focus:outline-none '.concat(selectedChat === chat._id ? 'bg-pupule-900' : 'hover:bg-pupule-400')}
            key={chat._id}
            onClick={() => setSelectedChat(chat._id)}
          >
            <img
              alt="chat picto"
              src={getChatIcon(chat)}
              className="h-12 w-12 rounded-full mr-3"
            />
            <span>{chat.name}</span>
          </button>
        ))}
      </div>
      <div className="w-4/5">eza</div>
      <NewChatModal
        users={users}
        isOpen={newChatModalOpen}
        closeCb={() => setNewChatModalOpen(false)}
        createCb={(selectedUsers) => {
          // TODO create chats with selectedUsers
          console.log(selectedUsers);
          setNewChatModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;

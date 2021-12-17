import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import * as namez from 'namez';
import { GET_USERS, GET_CHATS, CREATE_CHAT } from '../utils/graphql';
import Plus from '../components/images/Plus';
import NewChatModal from '../components/NewChatModal';
import Picto from '../components/Picto';

const Home = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const { data: usersData } = useQuery(GET_USERS);
  const { data: chatsData } = useQuery(GET_CHATS);
  const [createChat] = useMutation(CREATE_CHAT);

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

  return (
    <div className="flex h-full bg-gray-800">
      <div className="w-4/5">
        <div className="w-full h-full text-center items-center justify-center flex flex-col" />
      </div>
      <div className="w-1/5 flex flex-col shadow-md">
        <div className="flex w-full p-4 border-b items-center justify-between">
          <span className="flex items-center font-bold">{t('home.new')}</span>
          <button type="button" className="bg-pupule outline-none p-1 rounded-full" onClick={() => setNewChatModalOpen(true)}>
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="pr-3  overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
          {chats.map((chat) => (
            <button
              type="button"
              className={'flex items-center pl-2 py-2 w-full text-white outline-none rounded-xl m-1 focus:outline-none '.concat(selectedChat === chat._id ? 'bg-pupule-900' : 'hover:bg-pupule-400')}
              key={chat._id}
              onClick={() => setSelectedChat(chat._id)}
            >
              <Picto members={chat.members} />
              <span className="ml-3">{chat.name}</span>
            </button>
          ))}

        </div>
      </div>
      <NewChatModal
        users={users}
        isOpen={newChatModalOpen}
        closeCb={() => setNewChatModalOpen(false)}
        createCb={(selectedUsers) => {
          createChat({
            variables: {
              chatCreateData: {
                name: namez({ format: 'title', separator: ' ' }),
                members: selectedUsers,
              },
            },
          }).then((res) => {
            setChats((old) => [
              ...old,
              res.data.createChat,
            ]);
          });
          setNewChatModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;

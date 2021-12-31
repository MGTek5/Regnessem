import React, {
  useContext, useEffect, useRef, useState,
} from 'react';
import {
  useQuery,
  useMutation,
  useSubscription,
  useLazyQuery,
} from '@apollo/client';
import { useTranslation } from 'react-i18next';
import * as namez from 'namez';
import toast from 'react-hot-toast';
import { Howl, Howler } from 'howler';
import NewChatModal from '../components/NewChatModal';
import {
  GET_USERS,
  GET_CHATS,
  CREATE_CHAT,
  CHAT_CREATED,
  GET_MESSAGES,
  MESSAGE_CREATED,
  CREATE_MESSAGE,
  CHAT_DELETED,
  DELETE_CHAT,
} from '../utils/graphql';
import UserContext from '../contexts/user.context';
import GifSearch from './Home/GifSearch';
import Chat from './Home/Chat';
import ChatList from './Home/ChatList';

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)

  );
}

const Home = () => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatModalOpen, setNewChatModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState(null);
  const [notifiedChats, setNotifiedChats] = useState([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const chatRef = useRef();
  const { data: usersData } = useQuery(GET_USERS);
  const { data: chatsData } = useQuery(GET_CHATS);
  const [createChat] = useMutation(CREATE_CHAT);
  const [deleteChat] = useMutation(DELETE_CHAT);
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const { error: chatCreatedError, data: chatCreatedData } = useSubscription(CHAT_CREATED);
  const { error: chatDeletedError, data: chatDeletedData } = useSubscription(CHAT_DELETED);
  const { error: messageCreatedError, data: messageCreatedData } = useSubscription(MESSAGE_CREATED);
  const userContext = useContext(UserContext);
  Howler.volume(0.4);
  const [
    fetchMessages, {
      data: messagesData,
      error: messagesError,
    },
  ] = useLazyQuery(GET_MESSAGES, {
    variables: {
      chatId: selectedChat,
    },
  });

  const scrollToBottom = () => {
    const { children } = chatRef?.current || { children: null };
    if (!children) return;
    const scrollInterval = setInterval(() => {
      if (isInViewport(children[children.length - 1])) {
        clearInterval(scrollInterval);
      } else {
        children[children.length - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const sendMessage = (content, dimensions) => {
    createMessage({
      variables: {
        messageCreateData: {
          chat: selectedChat,
          author: userContext.user._id,
          message: content,
          width: dimensions[0],
          height: dimensions[1],
        },
      },
    });
  };

  useEffect(() => {
    if (chatCreatedData) {
      const newChat = chatCreatedData.chatCreated;
      setChats((old) => [newChat, ...old]);
      return;
    }
    if (chatCreatedError) {
      toast.error(t('common.error'));
    }
  }, [chatCreatedData, chatCreatedError, t]);

  useEffect(() => {
    setNewMessage(messageCreatedData);
  }, [messageCreatedData]);

  useEffect(() => {
    if (notifiedChats.includes(selectedChat)) {
      setNewMessage(true);
    }
  }, [selectedChat, notifiedChats]);

  useEffect(() => {
    if (newMessage) {
      const message = newMessage.messageCreated;
      if (selectedChat === message.chat._id) {
        setMessages((old) => [...old, message]);
        if (message.author._id === userContext.user._id) {
          scrollToBottom();
        } else {
          setHasNewMessage(true);
        }
      } else {
        new Howl({ src: ['/you_suffer.mp3'] }).play();
        setNotifiedChats((old) => [...old, message.chat._id]);
      }
      setNewMessage(null);
    }
    if (messageCreatedError) {
      toast.error(t('common.error'));
    }
  }, [messageCreatedError, newMessage, t, selectedChat, userContext]);

  useEffect(() => {
    if (chatDeletedData) {
      setChats((old) => old.filter((chat) => chat._id !== chatDeletedData.chatDeleted._id));
    }
    if (chatDeletedError) {
      toast.error(t('common.error'));
    }
  }, [chatDeletedError, chatDeletedData, t]);

  useEffect(() => {
    if (newMessage && newMessage.messageCreated.chat._id !== selectedChat) {
      const sortedChats = [...chats].sort((a, b) => a.lastMessage - b.lastMessage);
      setChats(sortedChats);
    }
  }, [newMessage, chats, selectedChat]);

  useEffect(() => {
    if (usersData) {
      setUsers(usersData.getUsers);
    }
    if (chatsData && chatsData.getChats.length > 0) {
      setChats(chatsData.getChats);
      if (!selectedChat) {
        setSelectedChat(chatsData.getChats[0]._id);
      }
    }
  }, [usersData, chatsData, selectedChat]);

  useEffect(() => {
    setMessages([]);
    if (selectedChat) {
      fetchMessages();
      if (messagesError) {
        toast.error(t('common.error'));
      }
    }
  }, [selectedChat, t, fetchMessages, messagesError]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData.getMessages);
      scrollToBottom();
    }
  }, [messagesData]);

  const handleChatChange = (id) => {
    setSelectedChat(id);
    setNotifiedChats((old) => [...old].filter((e) => e !== id));
  };

  return (
    <div className="flex h-full">
      <div className="w-4/5">
        <div className="w-full h-full flex flex-col lg:flex-row">
          <GifSearch sendMessage={sendMessage} />
          <Chat
            messages={messages}
            chatRef={chatRef}
            selectedChat={selectedChat}
            chats={chats}
            hasNewMessage={hasNewMessage}
            setHasNewMessage={setHasNewMessage}
            scrollToBottom={scrollToBottom}
          />
        </div>
      </div>
      <div className="w-1/5 flex flex-col shadow-md">
        <ChatList
          chats={chats}
          setNewChatModalOpen={setNewChatModalOpen}
          notifiedChats={notifiedChats}
          selectedChat={selectedChat}
          deleteChat={deleteChat}
          handleChatChange={handleChatChange}
        />
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
            });
            setNewChatModalOpen(false);
          }}
        />
      </div>
    </div>
  );
};

export default Home;

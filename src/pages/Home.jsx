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
import axios from 'axios';
import { Howl, Howler } from 'howler';
import Plus from '../components/images/Plus';
import NewChatModal from '../components/NewChatModal';
import Picto from '../components/Picto';
import Search from '../components/images/Search';
import Message from '../components/Message';
import { TENOR_API_BASE_URL, TENOR_API_KEY } from '../constant';
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
import Sad from '../components/images/Sad';
import Trash from '../components/images/Trash';
import UserContext from '../contexts/user.context';

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
  const [gifs, setGifs] = useState([]);
  const [messages, setMessages] = useState([]);
  const [gifFilter, setGifFilter] = useState(undefined);
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
    const { children } = chatRef.current;
    const scrollInterval = setInterval(() => {
      if (isInViewport(children[children.length - 1])) {
        clearInterval(scrollInterval);
      } else {
        children[children.length - 1].scrollIntoView({ behavior: 'smooth' });
      }
    }, 500);
  };

  const clearGifSearchBarInput = () => {
    setGifs([]);
    setGifFilter('');
  };
  const sendMessage = (content, dimensions) => {
    clearGifSearchBarInput();
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
  const getCurrentChatName = () => (
    chats.find((chat) => chat._id === selectedChat).name
  );

  const getCurrentChatUsernames = () => (
    chats.find((chat) => chat._id === selectedChat).members.map((member) => member.username)
  );

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

  useEffect(() => {
    const fetchGifs = async () => {
      try {
        const res = await axios.get(`${TENOR_API_BASE_URL}/search?key=${TENOR_API_KEY}&q=${gifFilter}`);
        setGifs(res.data.results);
      } catch (err) {
        toast.error(t('common.error'));
      }
    };

    setGifs([]);
    if (gifFilter && gifFilter.length >= 3) {
      fetchGifs();
    }
  }, [gifFilter, t]);

  const handleChatChange = (id) => {
    setSelectedChat(id);
    setNotifiedChats((old) => [...old].filter((e) => e !== id));
  };

  return (
    <div className="flex h-full">
      <div className="w-4/5">
        <div className="w-full h-full flex">
          <div className="flex flex-col items-center justify-between shadow-md w-96 h-full">
            {
              !gifs.length
                ? (
                  <div className="h-full items-center justify-center flex flex-col">
                    <Search className="w-16 animate-bounce" />
                    <span>{t('home.nothingToShow')}</span>
                    <span>{t('home.searchSomething')}</span>
                  </div>
                ) : (
                  <div className="max-h-full overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray flex flex-wrap">
                    {gifs.map((gif) => (
                      <button
                        key={gif.id}
                        type="button"
                        className="w-1/2"
                        onClick={() => sendMessage(gif.media[0].gif.url, gif.media[0].gif.dims)}
                      >
                        <img className="w-48 h-48" alt={gif.id} src={gif.media[0].gif.url} />
                      </button>
                    ))}
                  </div>
                )
            }
            <div className="flex items-center">
              <Search className="h-6 w-6" />
              <input value={gifFilter} className="input h-10 w-full m-2 ml-4" placeholder={t('home.searchBar')} onChange={(e) => setGifFilter(e.target.value)} />
            </div>
          </div>
          <div ref={chatRef} className="w-full h-full pb-3 flex flex-col">
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
                  <div ref={chatRef} className="flex flex-col overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
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
        </div>
      </div>
      <div className="w-1/5 flex flex-col shadow-md">
        <div className="flex w-full p-4 border-b items-center">
          <button type="button" className="outline-none p-1 flex items-center justify-between w-full" onClick={() => setNewChatModalOpen(true)}>
            <span className="flex items-center font-bold">{t('home.new')}</span>
            <Plus className="w-6 h-6 bg-pupule rounded-full p-1" />
          </button>
        </div>
        <div className="pr-3 overflow-y-auto overflow-x-hidden scrollbar-w-1 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
          {chats.map((chat) => (
            <div className="indicator w-full">
              <div
                className={'flex w-full rounded-xl m-1 focus:outline-none group '.concat(selectedChat === chat._id ? 'bg-pupule-900' : 'hover:bg-pupule-400')}
                key={chat._id}
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
                  className="pr-3 hidden group-hover:block"
                  onClick={() => {
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

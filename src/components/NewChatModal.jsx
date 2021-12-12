import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Proptypes from 'prop-types';

const NewChatModal = ({
  users,
  closeCb,
  createCb,
  isOpen,
}) => {
  const [t] = useTranslation();
  const [userFilter, setUserFilter] = useState('');
  // TODO include connected user
  const [selectedUsers, setSelectedUsers] = useState([]);

  return (
    <div className={'modal '.concat(isOpen ? 'modal-open' : '')}>
      <div className="modal-box">
        <h2 className="text-center font-bold mb-2 pb-2 border-b border-purple-500">{t('home.new')}</h2>
        <input
          type="text"
          placeholder="Search by username"
          className="input input-primary input-bordered target:outline-none outline-none w-full mb-4 mt-1"
          onChange={(e) => setUserFilter(e.target.value)}
        />
        <div className="w-full max-h-96 overflow-y-auto overflow-x-hidden scrollbar-w-2 scrollbar-thumb-rounded-full scrollbar-thumb-gray-400 scrollbar-track-gray">
          {/* TODO exclude current user from list */}
          {users.filter((user) => user.username.includes(userFilter)).map((user) => (
            <button
              type="button"
              className={'flex items-center pl-2 py-2 text-white outline-none rounded-xl m-1 mr-4 focus:outline-none hover:bg-pupule-600 w-full '.concat(selectedUsers.includes(user._id) ? 'bg-purple-900' : '')}
              onClick={() => {
                setSelectedUsers((old) => {
                  if (old.includes(user._id)) {
                    return old.filter((id) => id !== user._id);
                  }
                  return [...old, user._id];
                });
              }}
              key={user._id}
            >
              <img
                alt="chat picto"
                src={user.profileGif || '/defaultPic.jpeg'}
                className="h-12 w-12 rounded-full mr-3"
              />
              <span>{user.username}</span>
            </button>
          ))}
        </div>
        <div className="modal-action">
          <button
            className="btn hover:underline mr-4"
            type="button"
            onClick={closeCb}
          >
            {t('button.cancel')}
          </button>
          <button
            className="btn btn-primary p-4 py-2 hover:underline disabled:btn-disabled"
            type="button"
            onClick={() => createCb(selectedUsers)}
            disabled={!selectedUsers.length}
          >
            {t('button.validate')}
          </button>
        </div>
      </div>
    </div>
  );
};

NewChatModal.propTypes = {
  // TODO define a type for users
  users: Proptypes.array.isRequired, // eslint-disable-line
  isOpen: Proptypes.bool.isRequired,
  closeCb: Proptypes.func.isRequired,
  createCb: Proptypes.func.isRequired,
};

NewChatModal.defaultProps = {};

export default NewChatModal;

import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import toast from 'react-hot-toast';
import Picto from '../components/Picto';
import Input from '../components/Input';
import UserContext from '../contexts/user.context';
import { UPDATE_USER, DELETE_USER } from '../utils/graphql';
import ConfirmationModal from '../components/ConfirmationModal';

const Profile = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      _id: userContext.user._id,
      profileGif: userContext.user.profileGif,
      username: userContext.user.username,
      email: userContext.user.email,
      password: '',
    },
    onSubmit: async (values) => {
      const newUser = values;
      try {
        if (newUser.password === '') delete newUser.password;
        const data = await updateUser({ variables: { userUpdateData: newUser } });
        userContext.setUser(data.data.updateUser);
        history.push('/');
      } catch (e) {
        toast.error(t('common.error'));
      }
    },
  });

  return (
    <div className="flex flex-col h-full w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center p-8 bg-gray-900 rounded-xl shadow-xl w-full md:w-1/4">
        <div className="h-28">
          <Picto members={[userContext.user]} className="relative h-28 w-28" />
        </div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col h-full w-full justify-around items-center mt-4">
          <Input
            value={formik.values.profileGif}
            label={t('profile.changeGif')}
            name="profileGif"
            type="link"
            id="profileGif"
            className="w-96"
            required={false}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.username}
            label={t('profile.changeUsername')}
            name="username"
            type="text"
            id="username"
            className="w-96"
            required={false}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.email}
            label={t('profile.changeEmail')}
            name="email"
            type="email"
            id="email"
            className="w-96"
            required={false}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <Input
            value={formik.values.password}
            label={t('profile.changePassword')}
            name="password"
            type="password"
            id="password"
            className="w-96"
            required={false}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />
          <div className="w-full flex items-end p-2 justify-end">
            <button type="submit" className="btn btn-primary mt-4">{t('button.submit')}</button>
          </div>
        </form>
      </div>
      <div className="bg-gray-900 shadow-xl rounded-xl w-full md:w-1/4 mt-3 px-8 border border-red-500">
        <h2 className="font-bold text-xl text-center mt-2 pb-2 border-b ">{t('profile.dangerZone')}</h2>
        <div className="mt-2 mb-8 pt-4 items-center justify-center flex">
          <span className="flex justify-between w-full items-center">
            <span>{t('profile.deleteAccount')}</span>
            <button type="button" className="btn btn-outline btn-error" onClick={() => setIsDeleteAccountModalOpen(true)}>{t('profile.proceed')}</button>
          </span>
        </div>
      </div>
      <ConfirmationModal
        open={isDeleteAccountModalOpen}
        confirmCb={() => {
          setIsDeleteAccountModalOpen(false);
          history.push('/register');
          deleteUser({
            variables: {
              userId: userContext.user._id,
            },
          });
          userContext.setUser(null);
        }}
        cancelCb={() => {
          setIsDeleteAccountModalOpen(false);
        }}
        description="confirmationModal.deleteAccount"
      />
    </div>
  );
};

export default Profile;

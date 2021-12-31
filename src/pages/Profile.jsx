import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Picto from '../components/Picto';
import Input from '../components/Input';
import UserContext from '../contexts/user.context';
import { UPDATE_USER } from '../utils/graphql';

const Profile = () => {
  const { t } = useTranslation();
  const userContext = useContext(UserContext);
  const [updateUser] = useMutation(UPDATE_USER);
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
        userContext.user = data.data.updateUser;
        history.push('/');
      } catch (e) {
        console.error(e);
      }
    },
  });

  return (
    <div className="flex flex-col h-full w-full items-center">
      <Picto members={[userContext.user]} />
      <form onSubmit={formik.handleSubmit} className="flex flex-col h-full w-full justify-around items-center mt-4">
        <Input
          value={formik.values.profileGif}
          label={t('profile.changeGif')}
          name="profileGif"
          type="text"
          id="profileGif"
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
          required={false}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button type="submit" className="btn btn-primary">{t('button.submit')}</button>
      </form>
    </div>
  );
};

export default Profile;

import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import { REGISTER } from '../utils/graphql';
import UserContext from '../contexts/user.context';

const Register = () => {
  const { t } = useTranslation();
  const [isAFunBoi, setIsAFunBoi] = useState(false);
  const [loading, setLoading] = useState(false);
  const [register] = useMutation(REGISTER, { onCompleted: () => setLoading(false) });
  const history = useHistory();
  const userContext = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = await register({
          variables: {
            registerData: { ...values },
          },
        });
        localStorage.setItem('regnessem-token', data.data.register.access_token);
        localStorage.setItem('regnessem-user', JSON.stringify(data.data.register.user));
        userContext.setUser(data.data.register.user);
        userContext.setAuthed(true);
        history.push('/');
      } catch (error) {
        toast.error(t('common.error'));
      }
    },
  });

  const getBackgroundImage = () => (isAFunBoi
    ? 'https://cdn.discordapp.com/attachments/838774176432128010/909471201003450408/le-nez-de-theo.gif)'
    : 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80');

  return (
    <div
      className="h-full w-full bg-cover bg-center relative"
    >
      <img
        alt="page background"
        style={{
          backgroundImage: `url(${getBackgroundImage()}`,
        }}
        className="absolute top-0 left-0 w-screen h-screen"
      />
      <div style={{ background: 'rgba(0,0,0,0.85)' }} className="absolute top-0 left-0 h-screen w-screen" />
      <div className="w-full h-full flex justify-center items-center">
        <div className="card w-full h-full sm:h-auto sm:w-auto md:w-96">
          {loading && (
            <div className="w-full h-full absolute bg-slate-900 opacity-90 flex flex-col justify-center items-center">
              <h3>{t('common.loading')}</h3>
            </div>
          )}
          <div className="card-body h-full px-8 py-12 bg-slate-900">
            <h2 className="card-title text-5xl font-bold text-center">{t('register.title')}</h2>
            <p className="text-center">{t('register.subtitle')}</p>
            <form onSubmit={formik.handleSubmit} className="mt-4">
              <div className="flex flex-col space-y-2">
                <Input label={t('register.email')} name="email" type="email" onBlur={formik.handleBlur} onChange={formik.handleChange} id="email" />
                <Input label={t('register.username')} name="username" onBlur={formik.handleBlur} onChange={formik.handleChange} id="username" />
                <Input label={t('register.password')} name="password" type="password" onBlur={formik.handleBlur} onChange={formik.handleChange} id="password" />
                <div className="flex justify-end mt-2">
                  <span className="mr-2">{t('register.fun_boi')}</span>
                  <input type="checkbox" onChange={() => setIsAFunBoi((old) => !old)} checked={isAFunBoi} className="checkbox checkbox-primary" />
                </div>
                <button type="submit" className="btn btn-primary">{t('button.submit')}</button>
                <Link to="/login" className="capitalize text-right hover:underline">{t('register.login')}</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Register;

import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const { t } = useTranslation();
  const [isAFunBoi, setIsAFunBoi] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async () => { },
  });


  const getBackgroundImage = () => {
    return isAFunBoi
    ? "https://cdn.discordapp.com/attachments/838774176432128010/909471201003450408/le-nez-de-theo.gif)"
    : "https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"

  }

  return (
    <div
      className="h-full w-full bg-cover bg-center relative"
    >
      <img
        style={{
          backgroundImage: `url(${getBackgroundImage()}`,
      }}
        className="absolute top-0 left-0 w-screen h-screen"
      />
      <div style={{ background: 'rgba(0,0,0,0.85)' }} className="absolute top-0 left-0 h-screen w-screen"></div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-full h-full sm:h-auto sm:w-auto bg-gray-800 flex flex-col items-center justify-center px-8 py-16 md:rounded-xl relative shadow-2xl">
          <h1 className="text-5xl font-bold">{t('login.title')}</h1>
          <h2 className="text-xl text-center">{t('login.subtitle')}</h2>
          <form onSubmit={formik.handleSubmit} className="mt-12 w-full">
            <Input
              placeholder={t('login.email')}
              label={t('login.email')}
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Input
              placeholder={t('login.password')}
              label={t('login.password')}
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="flex justify-end mt-8">
              <Button type="submit">{t('button.submit')}</Button>
            </div>
            <div className='flex items-center justify-end mt-2'>
              {t('login.fun_boi')}
              <input
                type="checkbox"
                className="ml-2 outline-none focus:outline-none bg-yellow"
                onChange={() => setIsAFunBoi(old => !old)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Login;

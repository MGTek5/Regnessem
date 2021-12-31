import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import client from './utils/apollo';
import Page from './components/Page';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';
import UserContext from './contexts/user.context';

const App = () => {
  const [user, setUser] = useState(null);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('regnessem-user')) {
      const u = JSON.parse(localStorage.getItem('regnessem-user'));
      setUser(u);
      setAuthed(true);
    }
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col dark">
      <BrowserRouter>
        <UserContext.Provider
          value={{
            user,
            authed,
            setUser,
            setAuthed,
          }}
        >
          <ApolloProvider client={client}>
            <Toaster />
            <Header />
            <main className="overflow-hidden">
              <Page>
                <Router />
              </Page>
            </main>
            <Footer />
          </ApolloProvider>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;

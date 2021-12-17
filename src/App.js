import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Toaster } from 'react-hot-toast';
import client from './utils/apollo';
import Page from './components/Page';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <div className="w-screen h-screen flex flex-col dark">
    <BrowserRouter>
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
    </BrowserRouter>
  </div>
);

export default App;

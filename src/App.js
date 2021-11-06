import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import client from './utils/apollo';
import Page from './components/Page';
import Router from './Router';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => (
  <div className="w-screen h-screen flex flex-col">
    <BrowserRouter>
      <ApolloProvider client={client}>
        <Header />
        <main>
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

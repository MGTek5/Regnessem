import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';

const Router = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/" exact component={Home} />
  </Switch>
);

export default Router;

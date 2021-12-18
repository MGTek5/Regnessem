import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

const Router = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/register" exact component={Register} />
    <Route path="/" exact component={Home} />
  </Switch>
);

export default Router;

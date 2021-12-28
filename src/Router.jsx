import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';

const PrivateRoute = ({
  path,
  exact,
  component,
}) => {
  const isLoggedIn = localStorage.getItem('regnessem-token');
  return isLoggedIn
    ? <Route path={path} exact={exact} component={component} />
    : <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  path: propTypes.string.isRequired,
  exact: propTypes.bool.isRequired,
  component: propTypes.node.isRequired,
};

const Router = () => (
  <Switch>
    <Route path="/login" exact component={Login} />
    <Route path="/logout" exact component={Logout} />
    <Route path="/register" exact component={Register} />
    <PrivateRoute path="/" exact component={Home} />
  </Switch>
);

export default Router;

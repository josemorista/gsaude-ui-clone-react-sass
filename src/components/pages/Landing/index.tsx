import React from 'react';
import {LandingHome} from './Home';
import {Login} from './Login';
import {Register} from './Register';
import {Switch, Route, Redirect} from 'react-router-dom';

export const Landing = () => {
  return (<Switch>
    <Route key='landing-home' path='/' exact component={LandingHome} />
    <Route key='login' path='/entrar' exact component={Login} />
    <Route key='register' path='/registrar' exact component={Register} />
    <Redirect from='*' to='/' />
  </Switch>);
};
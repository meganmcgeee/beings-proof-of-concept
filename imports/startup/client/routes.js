/* eslint-disable max-len */

import { IndexRoute, Route, Router, browserHistory } from 'react-router';

import App from '../../ui/layouts/App.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import { Meteor } from 'meteor/meteor';
import NewBeing from '../../ui/pages/NewBeing.js';
// import NotFound from '../../ui/pages/NotFound.js';
import React from 'react';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';
import { render } from 'react-dom';

const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="beings" path="/beings" component={ Beings } onEnter={ authenticate } />
        <Route name="newBeing" path="/Beings/new" component={ NewBeing } onEnter={ authenticate } />
        <Route name="editBeing" path="/beings/:_id/edit" component={ EditBeing } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
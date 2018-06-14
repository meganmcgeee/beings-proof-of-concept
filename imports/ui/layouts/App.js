import React, { PropTypes } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppNavigation from '../components/AppNavigation';
import Beings from '../pages/Beings';
import { Grid } from 'react-bootstrap';
import Index from '../pages/Index';
// import EditDocument from '../containers/EditDocument';
// import ViewDocument from '../containers/ViewDocument';
import Login from '../pages/Login';
import {Meteor} from 'meteor/meteor';
import NewBeing from '../pages/NewBeing';
import NotFound from '../pages/NotFound';
import RecoverPassword from '../pages/RecoverPassword';
import ResetPassword from '../pages/ResetPassword';
import { compose } from 'react-komposer';

const App = appProps => (
  <div>
    <Router>
      <div className="App">
        <AppNavigation {...appProps} />
        <Grid>
          <Switch>
            <Route exact name="index" path="/" component={Index} />
            <Authenticated exact path="/beings" component={Beings} {...appProps} />
            <Authenticated exact path="/beings/new" component={NewBeing} {...appProps} />
            <Authenticated exact path="/beings/:_id" component={ViewBeing} {...appProps} />
            <Authenticated exact path="/beings/:_id/edit" component={EditBeing} {...appProps} />
            <Public path="/signup" component={Signup} {...appProps} />
            <Public path="/login" component={Login} {...appProps} />
            <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
            <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
            <Route component={NotFound} />
          </Switch>
        </Grid>
        <h1>Hi.</h1>
      </div>
    </Router>
  </div>  
);

App.propTypes = {
  loggingIn: PropTypes.bool,
  authenticated: PropTypes.bool,
};
// React Komposer to display data?  It's buggy. We need a different one.
const composer = (props, onData) => {
  const loggingIn = Meteor.loggingIn();
  onData(null, {
    loggingIn,
    authenticated: !loggingIn && !!Meteor.userId(),
  });
};

export default App;





import React, { PropTypes } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import AppNavigation from '../components/AppNavigation';
import Authenticated from '../pages/Authenticated/Authenticated';
import Beings from '../pages/Beings/Beings';
import { ControlledCarousel } from '../components/ControlledCarousel/ControlledCarousel'
import { Grid } from 'react-bootstrap';
import Index from '../pages/Index/Index';
// import EditBeing from '../containers/EditBeing';
// import ViewBeing from '../containers/ViewBeing';
import Login from '../pages/Login/Login';
import {Meteor} from 'meteor/meteor';
import NewBeing from '../pages/NewBeing/NewBeing';
import NotFound from '../pages/NotFound/NotFound';
import RecoverPassword from '../pages/RecoverPassword/RecoverPassword';
import ResetPassword from '../pages/ResetPassword/ResetPassword';

// import { compose } from 'react-komposer';

const App = appProps => (
  <Router>
    <div className="App">
      <AppNavigation {...appProps} />
      <Grid>
        <Switch>
          <Route exact name="index" path="/" component={Index} />
          <Authenticated exact path="/beings" component={Documents} {...appProps} />
          <Authenticated exact path="/beings/new" component={NewDocument} {...appProps} />
          <Authenticated exact path="/beings/:_id" component={ViewDocument} {...appProps} />
          <Authenticated exact path="/beings/:_id/edit" component={EditDocument} {...appProps} />
          <Public path="/signup" component={Signup} {...appProps} />
          <Public path="/login" component={Login} {...appProps} />
          <Route name="recover-password" path="/recover-password" component={RecoverPassword} />
          <Route name="reset-password" path="/reset-password/:token" component={ResetPassword} />
          <Route component={NotFound} />
        </Switch>
      </Grid>
    </div>
  </Router>
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



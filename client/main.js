// import '/imports/startup/client';
import App from '../imports/App.js';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';

Meteor.startup(() => {
  render( < App / > , document.getElementById('render-target'));
});
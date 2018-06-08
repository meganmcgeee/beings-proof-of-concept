import { MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { browserHistory } from 'react-router';

const handleLogout = () => Meteor.logout(() => browserHistory.push('/login'));

const userName = () => {
  const user = Meteor.user();
  const name = user && user.profile ? user.profile.name : '';
  return user ? `${name.first} ${name.last}` : '';
};

const AuthenticatedNavigation = () => (
  <div>
    <Nav>
      <LinkContainer to="/beings">
        <NavItem eventKey={ 2 } href="/beings">Beings</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavDropdown eventKey={ 3 } title={ userName() } id="basic-nav-dropdown">
        <MenuItem eventKey={ 3.1 } onClick={ handleLogout }>Logout</MenuItem>
      </NavDropdown>
    </Nav>
  </div>
);

export default AuthenticatedNavigation;

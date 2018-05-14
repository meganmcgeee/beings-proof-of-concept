import React, { Component } from 'react';

// Being component - represents a single being
export default class Being extends Component {
  render() {
    return ( <li> {this.props.being.text} </li>
    );
  }
}
import React, { Component } from 'react';

import Being from './Being.js';

// App component - represents the whole app
export default class App extends Component {
  getBeings() {
    return [{
        _id: 1,
        text: 'This is Being 1'
      },
      {
        _id: 2,
        text: 'This is Being 2'
      },
      {
        _id: 3,
        text: 'This is Being 3'
      },
    ];
  }

  renderBeings() {
    return this.getBeings().map((being) => ( 
      <Being key = { being._id} being = { being } />
    ));
  }

  render() {
    return ( 
    <div className = "container" >
      <header>
        <h1> Being Timeline </h1> 
      </header>
        <ul> 
          { this.renderBeings()}
        </ul> 
      </div>
    );
  }
}
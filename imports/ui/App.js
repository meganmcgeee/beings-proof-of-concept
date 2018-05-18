import React, { Component } from 'react';

import Being from './Being.js';
import {Rule} from '../../engine/Rule.jsx';

var ruleJ = {"_rule": "Master"};

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

  renderSentences() {
    return this.getBeings().map((rule) => ( 
      <Rule key = { rule._id} json = { ruleJ } />
    ));
  }

  render() {
    return ( 
    <div className = "container" >
      <header>
        <h1> Sentence Editor </h1> 
      </header>
          { this.renderSentences()}
      </div>
      
    );
  }
}
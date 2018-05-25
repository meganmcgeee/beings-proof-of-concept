import React, { Component } from 'react';

import Being from './Being.js';
import {Rule} from '../../engine/Rule.jsx';

const ruleJ = {"_rule": "Master"};

// App component - represents the whole app
export default class App extends Component {
  getBeings() {
    return [{
        _id: 1,
        // text: 'This is Being 1'
      }
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
      </header>
          { this.renderSentences()}
      </div>
      
    );
  }
}
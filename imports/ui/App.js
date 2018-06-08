import React, { Component } from 'react';

// import Being from './Being.js';
import {Rule} from '../../engine/Rule.jsx';
import Webcam from 'react-webcam';

const ruleJ = {"_rule": "Master"};
// cam


// App component - represents the whole app
export default class App extends Component {
  getBeings() {
    return [{
        _id: 1,
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
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={400}/>
           <button onClick={this.capture}>Capture photo</button>
      </div>
      
    );
  }
}
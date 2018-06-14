import { Caption, Carousel, Item } from 'react-bootstrap';
import React, { Component } from 'react';

import { ControlledCarousel } from './ui/components/ControlledCarousel/ControlledCarousel'
// import Being from './Being.js';
import {Rule} from '../engine/Rule.jsx';
import Webcam from 'react-webcam';

const ruleJ = {"_rule": "Master"};



// App component - represents the whole app
export default class App extends Component {
  getBeings() {
    return [{
        _id: 1,
      }
    ];
  }
// Serve Sentence Editor
  renderSentences() {
    return this.getBeings().map((rule) => ( 
      <Rule key = { rule._id} json = { ruleJ } />
    ));
  }
  // Take photo
  setRef = (webcam) => {
    this.webcam = webcam;
  }
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
  };
  // Carousel
//https: //react-bootstrap.github.io/components/carousel/
  render() {
    return ( 
    <div className = "container" >
    <ControlledCarousel />
      {this.renderSentences()}  
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
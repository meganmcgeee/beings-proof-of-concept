import React from 'react';
// import './Index.scss';
// import {Rule} from '../../../engine/Rule.jsx';
import Webcam from 'react-webcam';

const ruleJ = {"_rule": "Master"};

const Index = () => (
  <div className="Index">
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

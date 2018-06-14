import React from 'react';
import Webcam from 'react-webcam';

setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
  };

const NewBeing = () => (
      <div>
        <Webcam
          audio={false}
          height={350}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          width={350}
        />
        <button onClick={this.capture}>Capture photo</button>
      </div>
    );
    
// NewBeing.propTypes = {
//   capture: PropTypes.object.isRequired,
// };

export default NewBeing;

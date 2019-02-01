import React, { Component } from 'react';
import {Sigma, LoadJSON} from 'react-sigma'
import './Canvas.css';

class App extends Component {
  render() {
    return (
        <div id="canvasContainer">
          <Sigma style={{width:"inherit", height:"100%"}}>
            <LoadJSON path="./temp-data.json" />
          </Sigma>
        </div>
    );
  }
}

export default App;

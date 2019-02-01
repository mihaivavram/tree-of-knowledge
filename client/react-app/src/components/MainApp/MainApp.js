import React, { Component } from 'react';
import './MainApp.css';
import TopNav from '../TopNav/TopNav'
import Canvas from '../Canvas/Canvas'
import Footer from '../Footer/Footer'

class MainApp extends Component {
  render() {
    return (
      <div id="mainApp">
        <TopNav />
        <Canvas />
        <Footer />
      </div>
    );
  }
}

export default MainApp;

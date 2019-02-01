import React, { Component } from 'react';
import {Sigma, LoadJSON} from 'react-sigma'
import './Canvas.css';

import FormNode from "../FormNode/FormNode";
import Popup from 'reactjs-popup'

class App extends Component {


    /*
    var canvas = document.getElementById('myCanvas'),
    elemLeft = elem.offsetLeft,
    elemTop = elem.offsetTop,
    context = elem.getContext('2d'),
    elements = [];
    */

    constructor(props) {
        super(props)
        this.state = {open: false}
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)

    }

    openModal (){
        this.setState({ open: true })
    }
    closeModal () {
        this.setState({ open: false })
    }

    render() {
    return (
        <div id="canvasContainer">
          <Sigma style={{width:"inherit", height:"100%"}} onClickStage={this.openModal}>
            <LoadJSON path="./temp-data.json" />
          </Sigma>
            <Popup ref={c => (this._form_node = c)}
                   open={this.state.open}
                   closeOnDocumentClick
                   onClose={this.closeModal}
            >
                <FormNode onClose={this.closeModal}/>
            </Popup>
        </div>
    );
  }
}

export default App;

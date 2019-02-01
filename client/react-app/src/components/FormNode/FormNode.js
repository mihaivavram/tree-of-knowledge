import React, {Component} from 'react';
import {Sigma, LoadJSON} from 'react-sigma'
import './FormNode.css';

// import pop up element for onclick event
import Popup from 'reactjs-popup'

class PopUpForm extends Component {
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
            <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}
            >
                <FormNode/>
            </Popup>
        );
    };

}


class FormNode extends Component {
    render() {
        return (
            <form>
                <label>
                    Node Name: <input type="text" name="name"/>
                </label>
                <label>
                    Node Type: <input type="text" name="type"/>
                </label>
                <input type="submit" value="Submit"/>
            </form>
        );
    }
}

//export default FormNode;
export default FormNode

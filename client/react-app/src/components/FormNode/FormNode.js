import React, {Component} from 'react';
import {Sigma, LoadJSON} from 'react-sigma'
import './FormNode.css';

// import pop up element for onclick event
import Popup from 'reactjs-popup'

// import axios for rest api handler
import axios from 'axios'

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
    constructor() {
        super();

        this.state = {
            formFields: {name: '',type: ''}
        }
    }

    handleSubmit = (event) => {
        // no page change
        event.preventDefault();
        //get all data
        let formFields = {
            name: event.target.name.value,
            type: event.target.type.value
        }

        axios.get('http://localhost:3000/addNode/'+formFields.name+'/'+formFields.type)
            .then(function(response){
                console.log(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Node Name: <input type="text" name="name"/>
                </label> <br />
                <label>
                    Node Type: <input type="text" name="type"/>
                </label> <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

//export default FormNode;
export default FormNode

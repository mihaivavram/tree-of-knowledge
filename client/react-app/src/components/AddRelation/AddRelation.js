import React, {Component} from 'react';

// import axios for rest api handler
import axios from 'axios'


class AddRelation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formFields: {name: '',type: ''}
        }
    }

    handleSubmit = async (event) => {
        // no page change
        event.preventDefault();
        //get all data
        let formFields = {
            name: event.target.name.value,
            type: event.target.type.value
        }

        let addNodeResponse =
          await axios.get('http://localhost:3001/addNode/'+
                           formFields.type+'/'+formFields.name);
        console.log(addNodeResponse);
        this.props.onClose();
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

export default AddRelation;

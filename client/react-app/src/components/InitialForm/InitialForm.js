import React, {Component} from 'react';
import './InitialForm.css';


class InitialForm extends Component {
    constructor(props) {
        super(props);

        this.addNodeNext = this.addNodeNext.bind(this);
        this.addRelationNext = this.addRelationNext.bind(this);
    }

    addNodeNext() {
      this.props.nodeRelationPopupStateHandler("AddNode");
    }

    addRelationNext() {
      this.props.nodeRelationPopupStateHandler("AddRelation");
    }

    render() {
        return (
            <div>
              <button onClick={this.addNodeNext}>Add Node</button>
              <button onClick={this.addRelationNext}>Add Relation</button>
            </div>
        );
    }
}

export default InitialForm;

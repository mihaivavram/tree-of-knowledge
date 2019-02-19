import React, {Component} from 'react';
import {Sigma} from 'react-sigma'
import './Canvas.css';

import InitialForm from "../InitialForm/InitialForm";
import AddNode from "../AddNode/AddNode";
import AddRelation from "../AddRelation/AddRelation";
import Popup from 'reactjs-popup'
import axios from "axios";
import lodash from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        let sample = {
            "nodes": [
                {
                    "id": "n0",
                    "label": "A node",
                    "x": 0,
                    "y": 0,
                    "size": 50
                },
                {
                    "id": "n1",
                    "label": "Another node",
                    "x": 3,
                    "y": 1,
                    "size": 50
                },
                {
                    "id": "n2",
                    "label": "And a last one",
                    "x": 1,
                    "y": 3,
                    "size": 50,
                    "color": "#375a37"
                }
            ],
            "edges": [
                {
                    "id": "e0",
                    "label": "This is a test.",
                    "source": "n0",
                    "target": "n1",
                    "size": 10,
                    "type": "line"
                },
                {
                    "id": "e1",
                    "label": "This is a test.",
                    "source": "n1",
                    "size": 10,
                    "target": "n2"
                },
                {
                    "id": "e2",
                    "label": "This is a test.",
                    "source": "n2",
                    "size": 10,
                    "target": "n0"
                }
            ]
        };

        this.state = {open: false,
                      myGraph: sample,
                      popupComponent: null
                     };

        this.nodeRelationPopupStateHandler =
          this.nodeRelationPopupStateHandler.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._sigma = null;
    }

    nodeRelationPopupStateHandler(popupNextState) {
      if (popupNextState === "AddNode") {
        let discernedPopupComponent = <AddNode />;
        this.setState({
          popupComponent: discernedPopupComponent
        })
      }
      else if (popupNextState === "AddRelation") {
        let discernedPopupComponent = <AddRelation />;
        this.setState({
          popupComponent: discernedPopupComponent
        })
      }
    }

    openModal() {
        this.setState({open: true});
        this.refreshNode();
    }

    closeModal() {
        this.setState({open: false});
    }

    async refreshNode() {
        let respond = await axios.get('http://localhost:3001/selectAll');

        respond = respond.data;

        console.log(JSON.stringify(respond));

        let output = {nodes: [],edges: []};

        respond.records.forEach(function (element) {

            let field0 = element._fields[0];
            let field1 = element._fields[1];
            let field2 = element._fields[2];

            function getRandomInt(max) {
              return Math.floor(Math.random() * Math.floor(max));
            }

            let nodeA = {
                "id": field0.identity.low,
                "label": field0.properties.name,
                "size": 50,
                "x": getRandomInt(10),
                "y": getRandomInt(10)
            }

            let nodeB = {
                "id": field2.identity.low,
                "label": field2.properties.name,
                "size": 50,
                "x": getRandomInt(10),
                "y": getRandomInt(10)
            }

            let rel = {
                "id": field1.identity.low,
                "label": field1.type,
                "source": nodeA.id,
                "target": nodeB.id,
                "size": 10,
                "type": "line"
            }

            //console.log(nodeA);
            //console.log(nodeB);
            //console.log(rel);
            let register = lodash.filter(output.nodes, x => x.id === nodeA.id);
            if(register.length===0) {
                output.nodes.push(nodeA)
            }
            register = lodash.filter(output.nodes, x => x.id === nodeB.id);
            if(register.length===0) {
                output.nodes.push(nodeB)
            }
            output.edges.push(rel)

        });

        console.log(output);

        // refresh state
        this.setState({myGraph: output});
        //this._sigma.sigma.refresh();
        this._sigma.sigma.graph.clear();
        this._sigma.sigma.graph.read(output);
        this._sigma.sigma.refresh();
    };


    render() {
        return (
            <div id="canvasContainer">
                <Sigma style={{width: "inherit", height: "100%"}}
                       onClickStage={this.openModal}
                       graph={this.state.myGraph}
                       ref={c => (this._sigma = c)} >
                </Sigma>
                <Popup ref={c => (this._form_node = c)}
                       open={this.state.open}
                       closeOnDocumentClick
                       onClose={this.closeModal}
                >
                    <InitialForm
                     nodeRelationPopupStateHandler =
                      { this.nodeRelationPopupStateHandler }
                     onClose={this.closeModal}/>
                     { this.state.popupComponent }
                </Popup>
            </div>
        );
    }
}

export default App;

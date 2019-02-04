import React, {Component} from 'react';
import {Sigma, LoadJSON} from 'react-sigma'
import './Canvas.css';

import FormNode from "../FormNode/FormNode";
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

        this.state = {open: false, myGraph: sample};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this._sigma = null;
    }

    openModal() {
        this.setState({open: true});
        this.refreshNode();
    }

    closeModal() {
        this.setState({open: false});
    }

    async refreshNode() {
        let respond = await axios.get('http://localhost:3000/selectAll');

        respond = respond.data;

        console.log(JSON.stringify(respond));

        let output = {nodes: [],edges: []};

        /*
        const waitFor = (ms) => new Promise(r => setTimeout(r, ms));
        [1, 2, 3].forEach(async (num) => {
            await waitFor(50);
            console.log(num);
        });
        */

        let tempNodes = [];

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
                <Sigma style={{width: "inherit", height: "100%"}} onClickStage={this.openModal}
                       graph={this.state.myGraph}
                       ref={c => (this._sigma = c)} >
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

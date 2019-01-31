var express = require('express');
var app = express();


var neo4j = require("./node-middleware/neo4j-crud");

// Serve static files
app.use(express.static('public'));


app.get('/addnode/:type/:name', async function (req, res) {
    try {
        let type = req.params.type;
        let name = req.params.name;
        test = await (neo4j.addNode(type, name));
        res.send(test);
    }catch(ex){
        console.log(ex);
        res.send(ex.toString());
    }

})

app.get('/addrelation/:name1/:type1/:relation/:name2/:type2', async function (req, res) {
    try {
        let name1 = req.params.name1;
        let name2 = req.params.name2;
        let type1 = req.params.type1;
        let type2 = req.params.type2;
        let relation = req.params.relation;
        test = await (neo4j.addRelation(name1, type1, relation ,name2,type2));
        res.send(test);
    }catch(ex){
        console.log(ex);
        res.send(ex.toString());
    }

})


const port = 3000;

app.listen(port, () => console.log(`Tree of Knowledge listening on port ${port}!`));

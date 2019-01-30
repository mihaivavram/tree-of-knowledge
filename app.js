var express = require('express');
var app = express();


var neo4j = require("./node-middleware/neo4j-crud");

// Serve static files
app.use(express.static('public_resources'));


app.get('/addnode', async function (req, res) {
    try {
        test = await (neo4j.addNode("orc", "nikolaus"));
        res.send(test);
    }catch(ex){
        console.log(ex);
        res.send(ex.toString());
    }

})

const port = 3000;

app.listen(port, () => console.log(`Tree of Knowledge listening on port ${port}!`));

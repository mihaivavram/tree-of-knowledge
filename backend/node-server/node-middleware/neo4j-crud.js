const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "ktree4j"));
const session = driver.session();

exports.addNode = async function (nodeType, nodeName) {
    //try {
    let addResult = await session.run(
        'CREATE (a:' + nodeType + ' {name: {name} }) RETURN a',
        {name: nodeName}
    );
    return addResult;
    //}catch(ex){
    //    console.log(ex);
    //    return 0;
    //}
};

exports.addRelation = async function (nodeName1, nodeType1, predicate, nodeName2, nodeType2) {
    //try {
    let cypherStatement = 'MATCH (a:' + nodeType1 + '),(b:' + nodeType2 + ') \
    WHERE a.name = {name1} AND b.name = {name2} \
    CREATE (a)-[r:' + predicate + ']->(b) \
    RETURN r'

    let addResult = await session.run(cypherStatement,
        {name1: nodeName1, name2: nodeName2}
    );
    return addResult;
    //}catch(ex){
    //    console.log(ex);
    //    return 0;
    //}
};


exports.selectGraph = async function () {
    let jsonExample = {
        "records": [{
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 0, "high": 0}, "labels": ["Human"], "properties": {"name": "nikolaus"}}],
            "_fieldLookup": {"n": 0}
        }, {
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 1, "high": 0}, "labels": ["orc"], "properties": {"name": "nikolaus"}}],
            "_fieldLookup": {"n": 0}
        }, {
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 2, "high": 0}, "labels": ["villagers"], "properties": {"name": "mihai"}}],
            "_fieldLookup": {"n": 0}
        }, {
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 3, "high": 0}, "labels": ["villagers"], "properties": {"name": "mihai"}}],
            "_fieldLookup": {"n": 0}
        }, {
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 12, "high": 0}, "labels": ["human"], "properties": {"name": "niko"}}],
            "_fieldLookup": {"n": 0}
        }, {
            "keys": ["n"],
            "length": 1,
            "_fields": [{"identity": {"low": 13, "high": 0}, "labels": ["Human"], "properties": {"name": "Niko"}}],
            "_fieldLookup": {"n": 0}
        }],
        "summary": {
            "statement": {"text": "MATCH (n) RETURN n LIMIT 25", "parameters": {}},
            "statementType": "r",
            "counters": {
                "_stats": {
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0,
                    "propertiesSet": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0
                }
            },
            "updateStatistics": {
                "_stats": {
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0,
                    "propertiesSet": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0
                }
            },
            "plan": false,
            "profile": false,
            "notifications": [],
            "server": {"address": "localhost:7687"}
        }
    }

    let relationQuery = {
        "records": [{
            "keys": ["a", "r", "b"],
            "length": 3,
            "_fields": [{
                "identity": {"low": 3, "high": 0},
                "labels": ["villagers"],
                "properties": {"name": "mihai"}
            }, {
                "identity": {"low": 1, "high": 0},
                "start": {"low": 3, "high": 0},
                "end": {"low": 0, "high": 0},
                "type": "friend",
                "properties": {}
            }, {"identity": {"low": 0, "high": 0}, "labels": ["Human"], "properties": {"name": "nikolaus"}}],
            "_fieldLookup": {"a": 0, "r": 1, "b": 2}
        }, {
            "keys": ["a", "r", "b"],
            "length": 3,
            "_fields": [{
                "identity": {"low": 2, "high": 0},
                "labels": ["villagers"],
                "properties": {"name": "mihai"}
            }, {
                "identity": {"low": 0, "high": 0},
                "start": {"low": 2, "high": 0},
                "end": {"low": 0, "high": 0},
                "type": "friend",
                "properties": {}
            }, {"identity": {"low": 0, "high": 0}, "labels": ["Human"], "properties": {"name": "nikolaus"}}],
            "_fieldLookup": {"a": 0, "r": 1, "b": 2}
        }],
        "summary": {
            "statement": {"text": "MATCH (a)-[r]->(b) RETURN a,r,b LIMIT 25", "parameters": {}},
            "statementType": "r",
            "counters": {
                "_stats": {
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0,
                    "propertiesSet": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0
                }
            },
            "updateStatistics": {
                "_stats": {
                    "nodesCreated": 0,
                    "nodesDeleted": 0,
                    "relationshipsCreated": 0,
                    "relationshipsDeleted": 0,
                    "propertiesSet": 0,
                    "labelsAdded": 0,
                    "labelsRemoved": 0,
                    "indexesAdded": 0,
                    "indexesRemoved": 0,
                    "constraintsAdded": 0,
                    "constraintsRemoved": 0
                }
            },
            "plan": false,
            "profile": false,
            "notifications": [],
            "server": {"address": "localhost:7687"}
        }
    }
    let cypherStatement = 'MATCH (n) RETURN n LIMIT 25';
    cypherStatement = "MATCH (a)-[r]->(b) RETURN a,r,b LIMIT 25";

    let selectResult = await session.run(cypherStatement);
    return selectResult;
};


/*
resultPromise.then(result => {
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);

    // on application exit:
    driver.close();
});
*/
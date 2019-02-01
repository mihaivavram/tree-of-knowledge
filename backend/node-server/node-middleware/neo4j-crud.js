const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost:7687", neo4j.auth.basic("neo4j", "ktree4j"));
const session = driver.session();

exports.addNode = async function (nodeType,nodeName){
    //try {
    let addResult = await session.run(
        'CREATE (a:'+nodeType+' {name: {name} }) RETURN a',
        {name: nodeName}
    );
    return addResult;
    //}catch(ex){
    //    console.log(ex);
    //    return 0;
    //}
};

exports.addRelation = async function (nodeName1,nodeType1,predicate,nodeName2,nodeType2){
    //try {
    let cypherStatement = 'MATCH (a:'+nodeType1+'),(b:'+nodeType2+') \
    WHERE a.name = {name1} AND b.name = {name2} \
    CREATE (a)-[r:'+predicate+']->(b) \
    RETURN r'

    let addResult = await session.run(cypherStatement,
        {name1: nodeName1, name2:nodeName2}
    );
    return addResult;
    //}catch(ex){
    //    console.log(ex);
    //    return 0;
    //}
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
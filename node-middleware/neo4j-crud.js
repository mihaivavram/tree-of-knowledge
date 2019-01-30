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
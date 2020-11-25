const mysqlDatabase = require('./mysqlConnector');
const mongoDatabase = require('./mongodbConnector');


const connection = mysqlDatabase;

switch (connection){
    case mongoDatabase:
        console.log('hola');
        break;
    case mysqlDatabase:
        console.log('que');
        break;
}


module.exports = {
    connection
}
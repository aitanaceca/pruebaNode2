const mysqlDatabase = require('./mysqlConnector');
const mongoDatabase = require('./mongodbConnector');


const connection = mysqlDatabase;


module.exports = {
    connection
}
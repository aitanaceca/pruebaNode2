const mysqlDatabase = require('./mysqlConnector');
const mongoDatabase = require('./mongodbConnector');


const connection = mongoDatabase;


module.exports = {
    connection
}
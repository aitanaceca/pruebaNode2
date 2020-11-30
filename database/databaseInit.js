const mysqlDatabase = require('./mysqlConnector');
const mongoDatabase = require('./mongodbConnector');


const connection = mongoDatabase;


function connect(){ connection.connected(); };
function insert(values, fields){ connection.insertData(values, fields); };
function update(values, condition){ connection.updateData(values, condition); };
function find(){ connection.findData(); };
function findByField(data){ connection.findDataByField(data); };
function countData(field){ connection.countData(field); };
function remove(data){ connection.deleteData(data); };
function removeAll(){ connection.deleteAllData(); };


module.exports = {
    connect,
    insert,
    update,
    find,
    findByField,
    countData,
    remove,
    removeAll
}
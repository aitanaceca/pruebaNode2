const mysqlDatabase = require('./mysqlConnector');
const mongoDatabase = require('./mongodbConnector');


const connection = mongoDatabase;


switch (connection){
    case mongoDatabase:
        function connect(){ connection.connected(); };
        function insert(values, fields){ connection.insertData(values, fields); };
        function find(data){ connection.find(data); };
        function findById(data){ connection.findDataByField(data); };
        function countData(data){ connection.countData(data); };
        function remove(data){ connection.deleteData(data); };
        break;
    case mysqlDatabase:
        function connect(){ connection.connected(); };
        function insert(values, fields){ connection.insertData(values, fields); };
        function update(values, condition){ connection.updateData(values, condition); };
        function find(){ connection.findData(); };
        function findById(id){ connection.findDataById(id); };
        function countData(field){ connection.countData(field); };
        function remove(condition){ connection.deleteData(condition); };
        function removeAll(){ connection.deleteAllData(); };
        break;
}


module.exports = {
    connect,
    insert,
    update,
    find,
    findById,
    countData,
    remove,
    removeAll
}
const Sequelize = require('sequelize');


const userModel = require('../models/userModelMysql');


// conectar a bbdd con sequelize

const sequelize = new Sequelize('prueba', 'root', 'admin1234', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


const User = userModel(sequelize, Sequelize);


function connected(){
    sequelize.sync({ force: false })
            .then(() => {
                console.log('Database table is created!')
            });
};


// insertar tabla
// npx sequelize model:generate --name nombreTabla --attributes col1:type,col2:type


// insertar datos
function insertData (data, fields){
    User.create(data, fields);
};


// modificar datos concretos
function updateData (valor, condicion){
    User.update(valor, condicion)
        .then((self) => {
            return self;
        })
        .catch(err => {
            console.log(err);
        });
};


// ver todos los datos
function findData (){
    User.findAll({raw:true})
        .then(function(users) {
            console.log(users);
        });
};


// ver datos concretos
function findDataById (id){
    User.findByPk(id)
        .then(function(users){
            console.log(users);
        });
};


// ver y contar datos
function countData (search){
    User.findAndCountAll(search)
        .then(function(users){
            console.log(users);
        });
};

// eliminar datos
function deleteData (condicion){
    User.destroy(condicion);
};


// eliminar todos los datos
function deleteAllData (){
    User.destroy({
        truncate: true
    });
};


module.exports = {
    connected,
    insertData,
    updateData,
    findData,
    findDataById,
    countData,
    deleteData,
    deleteAllData,
};

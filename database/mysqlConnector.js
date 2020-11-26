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
    User.create(data, fields)
        .then( console.log('Created') )
        .catch(err => {
            console.log(err);
        });
};


// modificar datos concretos
function updateData (value, condition){
    User.update(value, condition)
        .then((user) => {
            console.log(user);
            console.log('Updated')
            return user;
        })
        .catch(err => {
            console.log(err);
        });
};


// ver todos los datos
function findData (){
    User.findAll({raw:true})
        .then(users => {
            console.log(users);
        })
        .catch(err => {
            console.log(err);
        });
};


// ver datos concretos
function findDataByField (data){
    User.findOne(data)
        .then(users => {
            if (user.length >= 1){
                console.log('Found');
                console.log(user);
            } else {
                console.log('Not found');
            }
        })
        .catch(err => {
            console.log(err);
        });
};


// ver y contar datos
function countData (search){
    User.findAndCountAll(search)
        .then(users => {
            console.log(users);
            return users.count;
        })
        .catch(err => {
            console.log(err);
        });
};

// eliminar datos
function deleteData (condicion){
    User.destroy(condicion)
        .then( console.log('Deleted') )
        .catch(err => {
            console.log(err);
        });
};


// eliminar todos los datos
function deleteAllData (){
    User.destroy({
        truncate: true
    })
        .then(console.log('All deleted'))
        .catch(err => {
            console.log(err);
        });
};


module.exports = {
    connected,
    insertData,
    updateData,
    findData,
    findDataByField,
    countData,
    deleteData,
    deleteAllData,
};

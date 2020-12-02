const mongoose = require('mongoose');


const User = require('../models/userModelMongodb');


// conectar a bbdd
const dbURI = 'mongodb://yop:danone@localhost:27017';
function connected (){
    mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(
            console.log('Connected!')
        )
        .catch(err => {
            console.log(err);
        })
};


// insertar colección
function createCollection(name){
    User.createCollection(name)
        .then(result => {
            console.log('Created');
        })
        .catch(err => {
            console.log(err);
        });
}


// insertar datos
function insertData(values, fields){
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: values.email,
        password: values.password
    });
    user.save()
        .then(result => {
            console.log('Created');
        })
        .catch(err => {
            console.log(err);
        });
};


// modificar datos concretos
function updateData (value, condition){
    User.findOneAndUpdate(condition, value)
        .exec()
        .then((user) => {
            console.log(user);
            console.log('Updated')
            return user;
        })
        .catch(err => {
            console.log(err);
        });
};


// ver datos
function findData() {
    User.find()
        .exec()
        .then(user => {
            console.log(user);
        })
        .catch(err => {
            console.log(err);
        });
};


// ver datos concretos
function findDataByField(data) {
    User.find(data)
        .exec()
        .then(user => {
            if (user.length >= 1){
                console.log('Found');
                console.log(user);
            } else {
                console.log('Not found');
            }
        })
        .catch(err => {
            console.log(err);
        });;
};


// contar apariciones
function countData(data) {
    var apar;
    User.find(data)
        .exec()
        .then(user => {
            apar = User.count();
        })
        .catch(err => {
            console.log(err);
        });
    return apar;
};


// eliminar datos
function deleteData(data){
    User.deleteOne(data)
        .then( console.log('Deleted') )
        .catch(err => {
            console.log(err);
        });
};


// eliminar todos los datos
function deleteAllData(){
    User.deleteMany()
        .then(console.log('Deleted'))
        .catch(err => {
            console.log(err);
        });
}


module.exports = {
    connected,
    insertData,
    updateData,
    findData,
    findDataByField,
    countData,
    deleteData,
    deleteAllData
}
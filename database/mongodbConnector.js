const mongoose = require('mongoose');


const User = require('../models/userModelMongodb');


// conectar a bbdd
const dbURI = "mongodb+srv://admin1:admin1234@nodetuts.x3mus.mongodb.net/prueba?retryWrites=true&w=majority";
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


// insertar datos .save()
function insertData(em, pass){
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        email: em,
        password: pass
    });
    user.save()
        .then(result => {
            console.log('User created');
        })
        .catch(err => {
            console.log(err);
        });
};


// modificar datos concretos .update()

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


// ver datos .find()
function findData(data) {
    User.find(data)
        .exec()
        .then(user => {
            if (user.length >= 1){
                console.log('User found');
            } else {
                console.log('User doesnt exist');
            }
        })
        .catch(err => {
            console.log(err);
        });
};


// ver datos concretos .findById()
function findDataByField(data) {
    User.findById(data)
        .exec()
        .then(user => {
            if (user.length >= 1){
                console.log('User found');
            } else {
                console.log('User not found');
            }
        })
        .catch(err => {
            console.log(err);
        });;
};


// eliminar datos .remove()
function deleteData(data){
    User.remove(data);
};


module.exports = {
    connected,
    insertData,
    countData,
    findData,
    findDataByField
}
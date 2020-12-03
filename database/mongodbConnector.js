const mongoose = require('mongoose');


const User = require('../models/userModelMongodb');
const { changeTime } = require('./changeTime');


// conectar a bbdd
//const dbURI = 'mongodb+srv://admin1:admin1234@nodetuts.x3mus.mongodb.net/prueba?retryWrites=true&w=majority'
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
            for(let x = 0; x < user.length; x++){
                console.log({
                    'id: ': user[x]["_id"],
                    'email: ': user[x]["email"],
                    'password: ': user[x]["password"],
                    'createdAt: ': changeTime(user[x]["createdAt"]),
                    'updatedAt: ': changeTime(user[x]["updatedAt"])
                });
            }
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
                for(let x = 0; x < user.length; x++){
                    console.log({
                        'id: ': user[x]["_id"],
                        'email: ': user[x]["email"],
                        'password: ': user[x]["password"],
                        'createdAt: ': changeTime(user[x]["createdAt"]),
                        'updatedAt: ': changeTime(user[x]["updatedAt"])
                    });
                }
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
    createCollection,
    connected,
    insertData,
    updateData,
    findData,
    findDataByField,
    countData,
    deleteData,
    deleteAllData
}
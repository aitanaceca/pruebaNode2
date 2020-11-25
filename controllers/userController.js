const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/userModelMongodb");
const mongodbConnector = require("../database/mongodbConnector");
const mysqlConnector = require("../database/mysqlConnector");


// View
const get_user = (req, res) => {
    res.render('./userView', { title: 'Sign up' });
};


/*function new_user (req, res) {
    var apar = 0;
    mongodbConnector.findData({ email: req.body.email });
    apar = mongodbConnector.countData({ email: req.body.email });
    console.log(apar);
    if (apar >= 1) {
        console.log('Mail exists');
    } else {
        mongodbConnector.insertData(req.body.email, req.body.password);
        res.redirect('/user/signup');
    }
}*/

function new_user (req, res) {
    var apar = 0;
    mysqlConnector.findData({ email: req.body.email });
    apar = mysqlConnector.countData({ email: req.body.email });
    console.log(apar);
    if (apar >= 1) {
        console.log('Mail exists');
        res.json('Mail exist');
    } else {
        mysqlConnector.insertData({ email: req.body.email, password: req.body.password }, {fields: ["email", "password"]});
        res.redirect('/user/signup');
    }
}


// Mongo save data
/*const new_user = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log('Mail exists');
                res.redirect('/user/signup')
            } else {
                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    email: req.body.email,
                    password: req.body.password
                });
                user.save()
                    .then(result => {
                        console.log('User created');
                        res.redirect('/user/signup');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}*/


// app.post con encriptado
/*const new_user2 = (req, res) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                console.log('Mail exists');
                res.redirect('/user/signup')
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                res.redirect('/user/signup')
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
        });
};*/


module.exports = {
    get_user,
    new_user
}
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/userModel");

// View
const get_user = (req, res) => {
    res.render('./userView', { title: 'Sign up' });
};


// Mongo save data
const new_user = (req, res) => {
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
}


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
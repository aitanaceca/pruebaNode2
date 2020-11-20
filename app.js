const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./userModel');


// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');


// MongoDB
const dbURI = "mongodb+srv://admin1:admin1234@nodetuts.x3mus.mongodb.net/prueba?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(3000))
    .catch(err => console.log(err));


// middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});


// View
app.get('/user/signup', (req, res) => {
    res.render('userView', { title: 'Sign up' });
});


// mongo save data
app.post('/users', (req, res) => {
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
});


// app.post con encriptado
/*app.post('/users', (req, res) => {
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
})*/


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userRoutes = require('./routes/userRoutes');


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
app.use('/views', express.static('views'));


//Routes
app.use('/user', userRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
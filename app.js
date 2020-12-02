const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const database = require('./database/databaseInit');


// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');


// Database connect
database.connect();
//database.insertData({ email: 'hola@hola.com', password: '1234' }, { fields: ['email', 'password'] }); //-> funciona
//database.update({ email: 'aitana@jeje.com' }, { _id: '5fbf71f569eddc56f032be2f' } ); //-> funciona
//database.find(); //-> funciona
//database.findByField({ password:  'aitana' }); //-> funciona
//database.countData({ email: 'holu@jeje.com' });
//database.remove(  {where:{ email: 'holuu@jeje.com' } }); //-> funciona
//database.removeAll(); //-> funciona


// listener
app.listen(3000);


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

module.exports = {
    app
}
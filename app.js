const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes');
const database = require('./database/databaseInit');


// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');


// Database connect

var connect = database.connection;
//connect.connected();
//connect.insertData({ email: 'hola@hola.com', password: '1234' }, { fields: ['email', 'password'] }); //-> funciona
//connect.updateData({ email: 'a@x.com' }, { where: { id: 3 } }); //-> funciona
//connect.findData(); //-> funciona
//connect.findDataById(4); //-> funciona
//connect.deleteData({ where: { id: 5 } }); //-> funciona
//connect.deleteAllData(); //-> funciona


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
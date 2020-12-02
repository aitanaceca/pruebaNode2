const mongoose = require('mongoose');
const moment = require('moment-timezone');

var utc = Math.trunc(Date.now() / 1000)
var dateNow = moment.unix(utc).tz('Europe/Madrid').format('YYYY-MM-DD HH:mm:ss');
console.log(dateNow);


const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: dateNow,
        allowNull: false
    },
    updatedAt: {
        type: Date,
        default: dateNow,
        allowNull: false
    }
});


module.exports = mongoose.model('User', userSchema);
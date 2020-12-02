const moment = require('moment-timezone');

function changeTime(date) {
    var da = new Date(date)
    var d = Math.trunc(da.getTime() / 1000)
    var s = moment.unix(d).format('YYYY-MM-DD HH:mm:ss')
    return s;
}

module.exports = {changeTime};

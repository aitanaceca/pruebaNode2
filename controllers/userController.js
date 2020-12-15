const bcrypt = require("bcrypt");

const databaseConnector = require("../database/databaseInit");


// View
const get_user = (req, res) => {
    res.render('./userView', { title: 'Sign up' });
};


function new_user (req, res) {
    var apar = 0;
    databaseConnector.findByField({ email: req.body.email });
    apar = databaseConnector.countData({ email: req.body.email });
    console.log(apar);
    if (apar >= 1) {
        console.log('Mail exists');
        res.redirect('/user/signup');
    } else {
        databaseConnector.insert({ email: req.body.email, password: req.body.password}, {fields: ["email", "password"]});
        res.redirect('/user/signup');
    }
};


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
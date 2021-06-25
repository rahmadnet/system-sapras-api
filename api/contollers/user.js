const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require("dotenv").config();
const Cabang = require('../routes/models/cabang')
const User = require('../routes/models/user');

// menampilkan seluruh user
exports.user_get_all = (req, res, next) =>{
    User.find().select('id name no_wa email cabang')
    .populate('cabang')
    .exec().then(docs => {
        const response = {
            count: docs.length,
            cabang: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    no_wa: doc.no_wa,
                    email: doc.email,
                    cabang: doc.cabang,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/cabang/' + doc._id
                    }
                }
            })
        };
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

// signup user baru
exports.user_signup = (req, res, next) => {
    User.find({
            email: req.body.email
        }).exec()
        // .populate('cabang')
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail Exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            no_wa: req.body.no_wa,
                            email: req.body.email,
                            password: hash,
                            cabang: req.body.cabangId
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: "User created"
                                });
                            }).catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            });
                    }
                });
            }
        })
};

// login user
exports.user_login = (req, res, next) => {
    User.find({
            email: req.body.email
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth failed'
                    });
                }
                if (result){
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },process.env.JWT_KEY, {
                        expiresIn: "1h"
                    });
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    });
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

// delete user
exports.user_delete = (req, res, next) => {
    User.remove({
            _id: req.params.userId
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};
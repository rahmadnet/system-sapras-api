const Cabang = require('../routes/models/cabang');
const mongoose = require('mongoose');

// membuat cabang baru
exports.cabang_create_cabang = (req, res, next) => {
    console.log(req.file);
    const cabang = new Cabang({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc,
    });
    cabang.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created cabang successfully',
                createCabang: {
                    _id: result._id,
                    name: result.name,
                    desc: result.desc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/cabang/' + result._id
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};

// menampilkan seluruh cabang
exports.cabang_get_all = (req,res,next) => {
    Cabang.find().select('id name desc').exec().then(docs => {
        const response = {
            count: docs.length,
            cabang: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    desc: doc.desc,
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
};

// menampilkan cabang berdasarkan ID
exports.cabang_get_cabang = (req,res,next) => {
    const id = req.params.cabangId;
    Cabang.findById(id)
    .select('_id name desc')
    .exec()
    .then(doc => {
        console.log("From DataBase", doc);
        if(doc){
            res.status(200).json({
                cabang: doc,
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/cabang/' + id
                }
            });
        } else {
            res.status(404).json({
                message: `No valid entry found provided ID ${id}`
            });
        }
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
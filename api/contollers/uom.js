const mongoose = require('mongoose');
const Uom = require('../routes/models/uom');

exports.uom_get_all = (req, res, next) => {
    Uom.find().select('_id name desc').exec().then(docs => {
        const response = {
            count: docs.length,
            uom: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    desc: doc.desc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/uoms/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};

exports.uom_create_uom = (req, res, next) => {
    const uom = new Uom({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        desc: req.body.desc
    });
    uom.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Uom successfully',
                createUom: {
                    _id: result._id,
                    name: result.name,
                    desc: result.desc,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/uoms' + result._id
                    }
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

exports.uom_get_uom = (req, res, next) => {
    const id = req.params.uomId;
    Uom.findById(id)
        .select('_id name desc')
        .exec()
        .then(doc => {
            console.log('From DataBase', doc);
            if (doc) {
                res.status(200).json({
                    uom: doc,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/uoms/' + doc.id
                    }
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(404).json({
                message: `No valid entry found for provider ID ${id}`
            });
        });
};

exports.uom_update_uom = (req, res, next) => {
    const id = req.params.uomId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Uom.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Uom Updated',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/uoms/' + id
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

exports.uom_delete_uom = (req, res, next) => {
    const id = req.params.uomId;
    Uom.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Uom deleted',
                request: {

                    type: 'DELETE',
                    url: 'http://localhost:3000/uoms/' + id,
                    body: {
                        name: 'String',
                        desc: 'String'
                    }
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
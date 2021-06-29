const Barang = require('../routes/models/barang');
const mongoose = require('mongoose');

// menampilkan semua barang
exports.barang_get_all = (req, res, next) => {
    Barang.find().select('_id name kondisi status quantity barangImage category uom')
    .populate('category uom').exec().then(docs => {
        const response = {
            count: docs.length,
            barang: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    kondisi: doc.kondisi,
                    status: doc.status,
                    barangImage: doc.barangImage,
                    category: doc.category,
                    uom: doc.uom,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/barang/' + doc._id
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
}

// membuat barang baru
exports.barang_create_barang = (req, res, next) => { 
    console.log(req.file);
    const barang = new Barang({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        kondisi: req.body.kondisi,
        status: req.body.status,
        quantity: req.body.quantity,
        barangImage: req.file.path,
        category: req.body.categoryId,
        uom: req.body.uomId
    });
    barang.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created barang successfully',
                createBarang: {
                    _id: result._id,
                    name: result.name,
                    kondisi: result.kondisi,
                    status: result.status,
                    quantity: result.quantity,
                    category: result.category,
                    uom: result.uom,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/barang/' + result._id
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

// menampilkan barang berdasarkan ID
exports.barang_get_barang = (req, res, next) => {
    const id = req.params.barangId;
    Barang.findById(id)
        .select('_id name kondisi status quantity photo category uom').populate('category uom')
        .exec()
        .then(doc => {
            console.log("From Data Base", doc);
            if (doc) {
                res.status(200).json({
                    barang: doc,
                    request: {
                        type: 'GET',
                        url: ' '
                    }
                });
            } else {
                res.status(404).json({
                    message: `No valid entry found for provided ID ${id}`
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    };

// update barang
exports.barang_upate_barang = (req, res, next) => {
    const id = req.params.barangId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Barang.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Barang update',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/barang/' + id
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

// delete barang
exports.barang_delete_barang = (req, res, next) => {
    const id = req.params.barangId;
    Barang.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Barang delete',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/barang/' + id,
                    body: {
                        name: 'String',
                        kondisi: 'String',
                        status: 'String',
                        quantity: 'Number',
                        barangImage: 'String',
                        category: 'String',
                        uom: 'String    '
                    }
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
};
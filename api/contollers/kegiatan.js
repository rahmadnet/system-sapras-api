const Kegiatan = require('../routes/models/kegiatan');
const mongoose = require('mongoose');

// menampilkan semua kegiatan
exports.kegiatan_get_all = (req, res, next) => {
    Kegiatan.find().select('_id name kegiatanImage date operrator user')
    .populate('user').exec().then(docs => {
        const response = {
            count: docs.length,
            kegiatan: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    kegiatanImage: doc.kegiatanImage,
                    tanggal: doc.tanggal,
                    operator: doc.operator,
                    user: doc.user,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/kegiatan/' + doc._id
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

// membuat kegiatan baru
exports.kegiatan_create_kegiatan = (req, res, next) => {
    console.log(req.file);
    const kegiatan = new Kegiatan({
        _id: new mongoose.Types.ObjectId(),
        kegiatanImage: req.file.path,
        name: req.body.name,
        tanggal: req.body.tanggal,
        operator: req.body.operator,
        user: req.body.userId,
    });
    kegiatan.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created kegiatan successfully',
                createKegiatan: {
                    _id: result._id,
                    name: result.name,
                    tanggal: result.tanggal,
                    operator: result.operator,
                    user: result.user,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/kegiatan/' + result._id
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

// menampilkan kegiatan berdasarkan ID
exports.kegiatan_get_kegiatan = (req, res, next) => {
    const id = req.params.kegiatanId;
    Kegiatan.findById(id)
        .select('_id name kegiatanImage tanggal operrator user').populate('user')
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

// update kegiatan
exports.kegiatan_upate_kegiatan = (req, res, next) => {
    const id = req.params.kegiatanId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Kegiatan.update({
            _id: id
        }, {
            $set: updateOps
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Kegiatan update',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/kegiatan/' + id
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

// delete kegiatan
exports.kegiatan_delete_kegiatan = (req, res, next) => {
    const id = req.params.kegiatanId;
    Kegiatan.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'Kegiatan delete',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/kegiatan/' + id,
                    body: {
                        name: 'String',
                        kegiatanImage: 'String',
                        tanggal: 'Date',
                        operator: 'String',
                        user: 'String',
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
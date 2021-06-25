const Peminjaman = require('../routes/models/peminjaman');
const mongoose = require('mongoose');

// menampilkan semua peminjaman
exports.peminjaman_get_all = (req, res, next) => {
    Peminjaman.find().select('_id barang user date_pinjam date_kembali')
    .populate('barang user').exec().then(docs => {
        const response = {
            count: docs.length,
            peminjaman: docs.map(doc => {
                return {
                    _id: doc._id,
                    barang: doc.barang,
                    user: doc.user,
                    date_pinjam: doc.date_pinjam,
                    date_kembali: doc.date_kembali,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/peminjaman/' + doc._id
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

// membuat peminjaman baru
exports.peminjaman_create_peminjaman = (req, res, next) => {
    const peminjaman = new Peminjaman({
        _id: new mongoose.Types.ObjectId(),
        barang: req.body.barangId,
        user: req.body.userId,
        date_pinjam: req.body.date_pinjam,
        date_kembali: req.body.date_kembali,
    });
    peminjaman.save().then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created peminjaman successfully',
                createPeminjaman: {
                    _id: result._id,
                    barang: result.barang,
                    user: result.user,
                    date_pinjam: result.date_pinjam,
                    date_kembali: result.date_kembali,
                    request: {
                        type: 'POST',
                        url: 'http://localhost:3000/peminjaman/' + result._id
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

// menampilkan peminjaman berdasarkan ID
exports.peminjaman_get_peminjaman = (req, res, next) => {
    const id = req.params.peminjamanId;
    Peminjaman.findById(id)
        .select('_id barang user cabang status date_pinjam date_kembali').populate('barang user')
        .exec()
        .then(doc => {
            console.log("From Data Base", doc);
            if (doc) {
                res.status(200).json({
                    peminjaman: doc,
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

// update peminjaman
exports.peminjaman_upate_peminjaman = (req, res, next) => {
    const id = req.params.peminjamanId;
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
                message: 'Peminjaman update',
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/peminjaman/' + id
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

// delete peminjaman
exports.peminjaman_delete_peminjaman = (req, res, next) => {
    const id = req.params.peminjamanId;
    Peminjaman.remove({
            _id: id
        })
        .exec()
        .then(result => {
            res.status(200).json({
                message: 'delete peminjaman',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/peminjaman/' + id,
                    body: {
                        barang: 'String',
                        user: 'String',
                        status: 'String',
                        date_pinjam: 'Date',
                        date_kembali: 'Date'
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
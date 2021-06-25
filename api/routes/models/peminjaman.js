const mongoose = require('mongoose');
const peminjamanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    barang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barang',
        require: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    date_pinjam: {
        type: Date,
        require: true,
        default: Date.now()
    },
    date_kembali: {
        type: Date,
        require: true,
        default: Date.now()
    }

});

module.exports = mongoose.model('Peminjaman', peminjamanSchema);
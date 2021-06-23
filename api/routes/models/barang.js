const mongoose = require('mongoose');
const barangSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true
    },
    kondisi: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    quantity: {
        type: Number,
        require: true
    },
    photo: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    uom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Uom',
        require: true
    }
});

module.exports = mongoose.model('Barang', barangSchema);
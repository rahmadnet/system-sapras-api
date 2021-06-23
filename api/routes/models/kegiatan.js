const mongoose = require('mongoose');
const kegiatanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    photo: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now()},
    operator: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    },
    cabang: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cabang',
        require: true
    }
});

module.exports = mongoose.model('Kegiatan', kegiatanSchema);
const mongoose = require('mongoose');
const kegiatanSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    kegiatanImage: { type: String, required: true },
    tanggal: { type: Date, required: true, default: Date.now()},
    operator: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require:true
    }
});

module.exports = mongoose.model('Kegiatan', kegiatanSchema);
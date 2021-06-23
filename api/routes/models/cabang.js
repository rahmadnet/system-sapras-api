const mongoose = require('mongoose');
const cabangSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    desc: { type: String, required: true }
});

module.exports = mongoose.model('Cabang', cabangSchema);
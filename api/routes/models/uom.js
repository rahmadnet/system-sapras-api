const mongoose = require('mongoose');
const uomSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, require: true},
    desc: {type: String, require: true}
});

module.exports = mongoose.model('Uom', uomSchema);
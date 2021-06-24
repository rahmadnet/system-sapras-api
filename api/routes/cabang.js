const express = require('express');
const router = express.Router();

const Cabang = require('./models/cabang');
const CabangControllerr = require('../contollers/cabang');

router.post('/',CabangControllerr.cabang_create_cabang);
router.get('/',CabangControllerr.cabang_get_all);
router.get('/:cabangId',CabangControllerr.cabang_get_cabang);

module.exports = router;
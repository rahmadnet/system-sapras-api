const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UomCOntroller = require('../contollers/uom');

// Handle incoming GET request to /uoms
router.get("/", UomCOntroller.uom_get_all);
router.post('/', UomCOntroller.uom_create_uom);
router.get('/:uomId', UomCOntroller.uom_get_uom);
router.delete('/:uomId', UomCOntroller.uom_delete_uom);

module.exports = router;
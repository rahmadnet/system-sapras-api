const express = require('express');
const router = express.Router();

const category = require('./models/category');
const CategoryControllerr = require('../contollers/category');

router.post('/',CategoryControllerr.category_create_category);
router.get('/',CategoryControllerr.category_get_all);
router.get('/:categoryId',CategoryControllerr.category_get_category);
router.patch('/:categoryId',CategoryControllerr.category_update_category);
router.delete('/:categoryId',CategoryControllerr.category_delete_category);

module.exports = router;
const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});



const BarangControllerr = require('../contollers/barang');

router.get('/', BarangControllerr.barang_get_all);
router.post('/', upload.single('barangImage'), BarangControllerr.barang_create_barang);
router.get('/:barangId', BarangControllerr.barang_get_barang);
router.patch('/:barangId', BarangControllerr.barang_get_barang);
router.delete('/:barangId', BarangControllerr.barang_delete_barang);

module.exports = router;
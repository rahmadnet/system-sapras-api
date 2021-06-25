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


const KegiatanControllerr = require('../contollers/kegiatan');

router.post('/',upload.single('kegiatanImage'),KegiatanControllerr.kegiatan_create_kegiatan);
router.get('/',KegiatanControllerr.kegiatan_get_all);
router.get('/:kegiatanId',KegiatanControllerr.kegiatan_get_kegiatan);
router.patch('/:kegiatanId',KegiatanControllerr.kegiatan_upate_kegiatan);
router.delete('/:kegiatanId',KegiatanControllerr.kegiatan_delete_kegiatan);

module.exports = router;
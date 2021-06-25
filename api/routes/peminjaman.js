const express = require('express');
const router = express.Router();

const PeminjamanControllerr = require('../contollers/peminjaman');

router.post('/',PeminjamanControllerr.peminjaman_create_peminjaman);
router.get('/',PeminjamanControllerr.peminjaman_get_all);
router.get('/:peminjamananId',PeminjamanControllerr.peminjaman_get_peminjaman);
router.patch('/:peminjamananId',PeminjamanControllerr.peminjaman_upate_peminjaman);
router.delete('/:peminjamananId',PeminjamanControllerr.peminjaman_delete_peminjaman);

module.exports = router;
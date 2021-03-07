const express = require('express');
const controller = require('../controllers/certificateController');
const router = express.Router();

router.post('/createCertificate', controller.createCertificate);
router.put('/updateCertificateById/:Id', controller.updateCertificateById);
router.get('/getCertificate', controller.getCertificate);
router.delete('/deleteCertificateById/:Id', controller.deleteCertificateById);

module.exports = router;
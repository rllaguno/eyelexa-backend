const express = require('express');
const multer = require('multer');
const imageController = require('../controllers/imageController');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

//api route to upload image
router.post('/api/uploadImage', upload.single('image'), imageController.processImage);

module.exports = router;

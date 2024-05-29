const express = require('express');
const multer = require('multer');

//Controller
const devController = require('../controllers/devController')

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//devController routes
router.post('/api/devController/uploadImage', upload.single('image'), devController.uploadImage)

module.exports = router;
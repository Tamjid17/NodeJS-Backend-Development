const express = require('express');
const { uploadImageController, fetchImageController} = require('../controllers/image-controller');
const authMiddlware = require('../middleware/auth-middleware');
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require('../middleware/upload-middleware');
const router = express.Router();

router.post("/upload", authMiddlware, adminMiddleware, uploadMiddleware.single('image'), uploadImageController);
router.get('/all-images', authMiddlware, fetchImageController)

module.exports = router;
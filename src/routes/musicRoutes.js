const express = require('express')
const { createMusic, createAlbum } = require('../controllers/musicController')
const multer = require('multer')

const upload = multer({ storage: multer.memoryStorage() })
const router = express.Router();

router.post('/upload', upload.single("music"), createMusic)
router.post('/makeAlbum', createAlbum )

module.exports = router
const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController'); // Fix the file name to match the actual file name

// Route for URL shortening
router.post('/shorten', urlController.shortenUrl);

// Route for fetching all previously shortened URLs
router.get('/urls', urlController.getAllUrls);

// Route for URL redirection
router.get('/:shortCode', urlController.redirectUrl);

module.exports = router;

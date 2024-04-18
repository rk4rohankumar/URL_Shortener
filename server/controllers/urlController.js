const Url = require('../models/Url');
const shortid = require('shortid');

// Controller to handle URL shortening
exports.shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = shortid.generate();

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      // Create a new URL document and save it to the database
      url = new Url({
        originalUrl,
        shortCode,
      });
      await url.save();
      res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Controller to handle redirection to the original URL
exports.redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    // Find the URL document with the given short code
    const url = await Url.findOne({ shortCode });

    if (url) {
      // Redirect the user to the original URL
      res.redirect(url.originalUrl);
      console.log(url)
    } else {
      res.status(404).json({ error: 'URL not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllUrls = async (req, res) => {
    try {
      // Retrieve all URLs from the database
      const urls = await Url.find().sort({ createdAt: -1 });
  
      res.json(urls);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
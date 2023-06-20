const express = require('express');
const router = express.Router();

const urls = require('./api/urls');
const rssFeeds = require('./api/rssFeeds');

router.use('/urls', urls.router);
router.use('/rssFeeds', rssFeeds.router);

module.exports.router = router;
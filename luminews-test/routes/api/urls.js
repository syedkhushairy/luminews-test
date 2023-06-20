const express = require('express');
const router = express.Router();
const { get, getAll, addRSSUrl, updateRSSUrl, deleteRSSUrl } = require('../../controllers/url');

router.get('/', getAll);
router.get('/:id', get);
router.post('/', addRSSUrl);
router.post('/:id', updateRSSUrl);
router.delete('/:id', deleteRSSUrl);

module.exports.router = router;
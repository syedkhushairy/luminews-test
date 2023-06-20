const express = require('express');
const router = express.Router();
const { getAll, get } = require('../../controllers/rssfeed');

router.get('/', getAll);
router.get('/:id', get);

module.exports.router = router;
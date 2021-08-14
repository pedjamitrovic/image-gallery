const express = require('express');
const path = require("path");
const config = require('../config');

const router = express.Router();

router.get("/*", (req, res) => {
	return res.sendFile(path.join(config.imagePath, req.url.substring(1)));
});

module.exports = router;
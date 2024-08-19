const express = require("express");
const multer = require("multer");
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();

const controller = require('../../controllers/admin/post.controller');

router.get('/', controller.index);


module.exports = router;
const express = require('express');
const multer = require('multer');
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const upload = multer();
const router = express.Router();

const controller = require('../../controllers/admin/post-category.controller');
const validate = require('../../validates/admin/post-category.validate');

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create',
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);


module.exports = router;

const express = require('express');
const multer = require('multer');
const router = express.Router();
const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");
const controller = require("../../controllers/admin/post.controller");
const validate = require('../../validates/admin/posts.validate');


const upload = multer();


router.get('/', controller.index);


router.get('/create', controller.create);


router.post('/create',
    upload.fields(
        [
            { name: 'thumbnail', maxCount: 1 },
            { name: 'images', maxCount: 8 },
            { name: 'video', maxCount: 1 }

        ]),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);


router.get('/detail/:id', controller.detail);


router.get('/edit/:id', controller.edit);

router.patch('/change-multi', controller.changeMulti);

router.delete('/delete/:id', controller.deleteItem);

router.patch('/edit/:id',
    upload.fields([
        { name: 'thumbnail', maxCount: 1 },
        { name: 'images', maxCount: 8 },
        { name: 'video', maxCount: 1 }]
    ),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch
);

router.patch('/change-status/:status/:id', controller.changeStatus);

module.exports = router;

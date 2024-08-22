const PostCategory = require('../../models/post-category.model');
const systemConfig = require('../../config/system');

const createTreeHelper = require("../../helpers/createTree")
/* [GET] /admin/posts-category */
module.exports.index = async (req, res) => {
    let find = {
        deleted: false,
    }
    const records = await PostCategory.find(find);
    const newRecords = createTreeHelper.tree(records);
    res.render('admin/pages/posts-category/index', {
        pageTitle: 'Danh mục bài viết',
        records : newRecords
    });
}

/*[GET] /admin/posts-category/create*/
module.exports.create = async (req, res) =>{
    res.render('admin/pages/posts-category/create', {
        pageTitle: 'Thêm bài viết mới',
    });
}
/* [POST] /admin/posts/create */
module.exports.createPost = async (req, res) => {
    if(req.body.position == '') {
        const count = await PostCategory.countDocuments();
        req.body.position = count + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    const record = new PostCategory(req.body);
    await record.save();

    res.redirect(`${systemConfig.prefixAdmin}/posts-category`);
}
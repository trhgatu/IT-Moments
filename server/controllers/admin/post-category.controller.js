const PostCategory = require('../../models/post-category.model');
const systemConfig = require('../../config/system');

const createTreeHelper = require("../../helpers/createTree")
/* [GET] /admin/post-category */
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
/* [GET] /admin/posts-category/create */
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    function createTree(arr, parentId = ""){
        const tree = [];
        arr.forEach((item) =>{
            if(item.parent_id === parentId){
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0){
                    newItem.children = children;
                }
                tree.push(newItem);
            }
        });
        return tree;
    }

    const records = await PostCategory.find(find);
    const newRecords = createTree(records);

    res.render('admin/pages/posts-category/create', {
        pageTitle: 'Tạo danh mục',
        records : newRecords
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
/* [GET] /admin/posts-category/edit */
module.exports.edit = async (req, res) =>{
    try{
        const id = req.params.id;
        const data = await PostCategory.findOne({
            _id: id,
            deleted : false
        });
        const records = await PostCategory.find({
            deleted: false
        });
        const newRecords = createTreeHelper.tree(records);

        res.render('admin/pages/posts-category/edit', {
            pageTitle: 'Chỉnh sửa danh mục bài viết',
            data : data,
            records: newRecords
        });

    }catch(error){
        res.redirect(`${systemConfig.prefixAdmin}/posts-category`);
    }
}
/* [PATCH] /admin/posts-category/edit */
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await PostCategory.updateOne(
            {
                _id: id,
            },
            req.body
        )
        req.flash('success', `Cập nhật thành công!`)
    } catch(error) {
        req.flash('error', `Cập nhật thất bại!`)
    }
    res.redirect('back')
}
/* [DELETE] /admin/posts-category/delete */
module.exports.deleteItem = async (req, res) =>{
    const id = req.params.id;
    await PostCategory.updateOne({
        _id : id,
    },{
        deleted: true,
        deletedAt: new Date(),
    });
    req.flash('success', 'Xóa danh mục bài viết thành công!');
    res.redirect('back');
}

const PostCategory = require('../../models/post-category.model');
const systemConfig = require('../../config/system');
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const createTreeHelper = require("../../helpers/createTree")
/* [GET] /admin/post-category */
module.exports.index = async (req, res) => {
    const filterStatus = filterStatusHelper(req.query);
    let find = {
        deleted: false,
    }
    if(req.query.status) {
        find.status = req.query.status;
    }

    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //Pagination
    const countPostsCategory = await PostCategory.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 6
        },
        req.query,
        countPostsCategory
    );
    //End pagination

    //Sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue){
        sort[req.query.sortKey] = req.query.sortValue;
    }else{
        sort.position = "desc";
    }
    //End Sort

    const records = await PostCategory.find(find)
    .sort(sort)
    .limit(objectPagination.limitItems)
    .skip(objectPagination.skip);

    const newRecords = createTreeHelper.tree(records);
    res.render('admin/pages/posts-category/index', {
        pageTitle: 'Danh mục bài viết',
        records: newRecords,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
}
/* [GET] /admin/posts-category/create */
module.exports.create = async (req, res) => {
    let find = {
        deleted: false
    }
    function createTree(arr, parentId = "") {
        const tree = [];
        arr.forEach((item) => {
            if(item.parent_id === parentId) {
                const newItem = item;
                const children = createTree(arr, item.id);
                if(children.length > 0) {
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
        records: newRecords
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
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await PostCategory.findOne({
            _id: id,
            deleted: false
        });
        const records = await PostCategory.find({
            deleted: false
        });
        const newRecords = createTreeHelper.tree(records);

        res.render('admin/pages/posts-category/edit', {
            pageTitle: 'Chỉnh sửa danh mục bài viết',
            data: data,
            records: newRecords
        });

    } catch(error) {
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
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await PostCategory.updateOne({
        _id: id,
    }, {
        deleted: true,
        deletedAt: new Date(),
    });
    req.flash('success', 'Xóa danh mục bài viết thành công!');
    res.redirect('back');
}

/* [PATCH] /admin/posts-category/change-status/:status/:id */
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await PostCategory.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect('back');
}
/* [PATCH] /admin/posts-category/change-multi */
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');

    switch(type) {
        case 'active':
            await PostCategory.updateMany({ _id: { $in: ids } }, { status: 'active' });
            req.flash(
                'success',
                `Cập nhật trạng thái của ${ids.length} danh mục bài viết thành công!`
            )
            break;
        case 'inactive':
            await PostCategory.updateMany({ _id: { $in: ids } }, { status: 'inactive' });
            req.flash(
                'success',
                `Cập nhật trạng thái của ${ids.length} danh mục bài viết thành công!`
            );
            break;
        case 'delete-all':
            await PostCategory.updateMany(
                {
                    _id: { $in: ids },
                },
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            );
            req.flash('success', `Xóa ${ids.length} danh mục bài viết thành công!`);
            break;
        case 'change-position':
            for(const item of ids) {
                let [id, position] = item.split('-');
                position = parseInt(position);
                await PostCategory.updateOne({ _id: id }, { position: position });
            }
            req.flash(
                'success',
                `Thay đổi vị trí của ${ids.length} bài viết thành công!`
            );
            break;
        default:
            break;
    }
    res.redirect('back')
}
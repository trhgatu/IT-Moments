const Post = require("../../models/post.model");
const PostCategory = require("../../models/post-category.model");
const Account = require("../../models/account.model");
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const { post } = require("../../routes/admin/dashboard.route");
const createTreeHelper = require("../../helpers/createTree");
const systemConfig = require("../../config/system");


/* [GET] /admin/posts */
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
    const countPosts = await Post.countDocuments(find);

    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 6,
        },
        req.query,
        countPosts
    );
    //End pagination


    //Sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    } else {
        sort.position = "desc";
    }

    //End sort

    const posts = await Post.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip);

    for (const post of posts){
        const user = await Account.findOne({
            _id: post.createdBy.account_id
        });

        if(user){
            post.accountFullName = user.fullName;
        }
    }

    res.render('admin/pages/posts/index', {
        pageTitle: 'Danh sách bài viết',
        posts: posts,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination,
    });
}
/* [GET] /admin/posts/create */
module.exports.create = async (req, res) => {
    console.log(res.locals.user);
    let find = {
        deleted: false
    }
    const category = await PostCategory.find(find);
    const newCategory = createTreeHelper.tree(category);
    res.render('admin/pages/posts/create', {
        pageTitle: "Thêm bài viết mới",
        category: newCategory
    })
}
/* [POST] /admin/posts/create */
module.exports.createPost = async (req, res) => {
    if(req.body.position == '') {
        const countPosts = await Post.countDocuments();
        req.body.position = countPosts + 1;
    } else {
        req.body.position = parseInt(req.body.position);
    }
    req.body.createdBy = {
        account_id : res.locals.user.id
    };

    try {
        const post = new Post(req.body);
        await post.save();
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
}

/* [GET] /admin/posts/detail/:id */
module.exports.detail = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id,
        }

        const post = await Post.findOne(find)

        res.render('admin/pages/posts/detail', {
            pageTitle: `Chi tiết: ${post.title} `,
            post: post,
        });
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
}
/* [GET] /admin/posts/edit */
module.exports.edit = async (req, res) => {
    try {
        const find = {
            deleted: false,
            _id: req.params.id,
        }
        const post = await Post.findOne(find);

        const category = await PostCategory.find({
            deleted: false
        });
        const newCategory = createTreeHelper.tree(category);

        res.render('admin/pages/posts/edit', {
            pageTitle: 'Sửa bài viết',
            post: post,
            category: newCategory
        })
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
}
/* [PATCH] /admin/posts/edit */
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);
    console.log(req.body);
    try {
        await Post.updateOne(
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
/* [PATCH] /admin/posts/change-status/:status/:id */
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    await Post.updateOne({ _id: id }, { status: status });

    req.flash('success', 'Cập nhật trạng thái thành công!');
    res.redirect('back');
}
/* [PATCH] /admin/movies/change-multi */
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(', ');

    switch(type) {
        case 'active':
            await Post.updateMany({ _id: { $in: ids } }, { status: 'active' });
            req.flash(
                'success',
                `Cập nhật trạng thái của ${ids.length} bài viết thành công!`
            )
            break;
        case 'inactive':
            await Post.updateMany({ _id: { $in: ids } }, { status: 'inactive' });
            req.flash(
                'success',
                `Cập nhật trạng thái của ${ids.length} bài viết thành công!`
            );
            break;
        case 'delete-all':
            await Post.updateMany(
                {
                    _id: { $in: ids },
                },
                {
                    deleted: true,
                    deletedAt: new Date(),
                }
            );
            req.flash('success', `Xóa ${ids.length} bài viết thành công!`);
            break;
        case 'change-position':
            for(const item of ids) {
                let [id, position] = item.split('-');
                position = parseInt(position);
                await Post.updateOne({ _id: id }, { position: position });
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

/* [DELETE] /admin/movies/delete/:id */
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;
    await Post.updateOne(
        { _id: id },
        {
            deleted: true,
            deletedAt: new Date(),
        }
    );
    req.flash('success', `Xóa bài viết thành công!`);
    res.redirect('back');
}
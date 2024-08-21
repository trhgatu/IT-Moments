const Post = require("../../models/post.model");
const filterStatusHelper = require('../../helpers/filterStatus');
const searchHelper = require('../../helpers/search');
const paginationHelper = require('../../helpers/pagination');
const { post } = require("../../routes/admin/dashboard.route");
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
    res.render('admin/pages/posts/create', {
        pageTitle: "Thêm bài viết mới",
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

        //const category = await MovieCategory.find({
            //deleted: false
        //});
        //const newCategory = createTreeHelper.tree(category);

        res.render('admin/pages/posts/edit', {
            pageTitle: 'Sửa phim',
            post: post,
            //category: newCategory
        })
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/posts`);
    }
}
/* [PATCH] /admin/posts/edit */
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;
    req.body.position = parseInt(req.body.position);

    if(req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

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
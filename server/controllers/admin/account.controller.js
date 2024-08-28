const Account = require("../../models/account.model");
const Role = require("../../models/role.model");
const systemConfig = require('../../config/system');
const md5 = require("md5");

/* [GET] /admin/accounts */
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    };

    const records = await Account.find(find).select("-password -token");

    for(const record of records) {
        const role = await Role.findOne({
            _id: record.role_id,
            deleted: false
        });
        record.role = role;
    }


    res.render("admin/pages/accounts/index", {
        pageTitle: "Danh sách tài khoản",
        records: records
    });
}
/* [GET] /admin/accounts/create */
module.exports.create = async (req, res) => {
    const roles = await Role.find({
        deleted: false
    });
    res.render('admin/pages/accounts/create', {
        pageTitle: 'Tạo mới tài khoản',
        roles: roles
    })
}
/* [POST] /admin/accounts/create */
module.exports.createPost = async (req, res) => {
    try {
        const emailExist = await Account.findOne({
            email: req.body.email,
            deleted: false
        });

        if(emailExist) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`);
            res.redirect("back");
        } else {
            req.body.password = md5(req.body.password);
            const records = new Account(req.body);
            await records.save();
            res.redirect(`${systemConfig.prefixAdmin}/accounts`);
        }

    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts/create`);
    }
}
/* [GET] /admin/accounts/edit/:id */
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id,
    }
    try {
        const data = await Account.findOne(find);
        const roles = await Role.find({
            deleted: false
        });

        res.render('admin/pages/accounts/edit', {
            pageTitle: 'Chỉnh sửa tài khoản',
            data: data,
            roles: roles
        });
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/accounts`);
    }

}
/* [PATCH] /admin/accounts/edit */
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    try {
        const emailExist = await Account.findOne({
            _id: { $ne: id },
            email: req.body.email,
            deleted: false
        });

        if(emailExist) {
            req.flash('error', `Email ${req.body.email} đã tồn tại`);
        } else {
            if(req.body.password) {
                req.body.password = md5(req.body.password);
            } else {
                delete req.body.password;
            }

            await Account.updateOne(
                { _id: id },
                req.body
            );

            req.flash('success', `Cập nhật tài khoản thành công!`);
        }
    } catch(error) {
        req.flash('error', `Cập nhật tài khoản thất bại!`);
    }
    res.redirect('back');
};

/* [DELETE] /admin/accounts/delete/:id */
module.exports.deleteItem = async (req, res) => {
    try {
        const id = req.params.id;
        await Account.updateOne(
            { _id: id },
            {
                deleted: true,
                deletedAt: new Date(),
            }
        );
        req.flash('success', `Xóa tài khoản thành công!`);

    } catch(error) {
        req.flash('success', `Xóa tài khoản thất bại!`);
    }
    res.redirect('back');

}
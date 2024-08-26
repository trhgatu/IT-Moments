const Role = require("../../models/role.model");
const systemConfig = require('../../config/system');

/* [GET] /admin/roles */
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    };

    const records = await Role.find(find);

    res.render("admin/pages/roles/index", {
        pageTitle: "Nhóm quyền",
        records: records
    });
}

/* [GET] /admin/roles/create */
module.exports.create = async (req, res) => {
    res.render("admin/pages/roles/create", {
        pageTitle: "Tạo mới nhóm quyền",
    });
}

/* [POST] /admin/roles/create */
module.exports.createPost = async (req, res) => {
    try {
        const records = Role(req.body);
        await records.save();
        res.redirect(`${systemConfig.prefixAdmin}/roles`);
    } catch(error) {
        res.redirect(`${systemConfig.prefixAdmin}/roles/create`);
    }
}

/* [GET] /admin/roles/edit/:id */
module.exports.edit = async (req, res) => {
    const id = req.params.id;
    const find = {
        deleted: false,
        _id: id,
    }
    const data = await Role.findOne(find);

    res.render('admin/pages/roles/edit', {
        pageTitle: 'Sửa nhóm quyền',
        data: data,
    })
}
/* [PATCH] /admin/roles/edit */
module.exports.editPatch = async (req, res) => {
    const id = req.params.id;

    try {
        await Role.updateOne(
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
/* [GET] /admin/roles */
module.exports.permissions = async (req, res) => {
    let find = {
        deleted: false
    };

    const records = await Role.find(find);

    res.render('admin/pages/roles/permissions', {
        pageTitle: 'Phân quyền',
        records: records,
    })
}

module.exports.permissionsPatch = async (req, res) => {
    try {
        const permissions = JSON.parse(req.body.permissions);
        for(const item of permissions) {
            await Role.updateOne(
                { _id: item.id },
                { permissions: item.permissions }
            );
        }
        req.flash('success', `Cập nhật phân quyền thành công!`);
    }catch(error){
        req.flash('error', `Cập nhật phân quyền thất bại!`);
    }
    res.redirect("back");
}
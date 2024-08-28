const systemConfig = require("../../config/system");

const authMiddleWare = require("../../middlewares/admin/auth.middleware");
const dashboardRoutes = require("./dashboard.route");

const postRoutes = require("./post.route");
const postCategoryRoutes = require("./post-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route");
const authRoutes = require("./auth.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + '/dashboard', authMiddleWare.requireAuth, dashboardRoutes);
    app.use(PATH_ADMIN + '/posts', authMiddleWare.requireAuth, postRoutes);
    app.use(PATH_ADMIN + '/posts-category', authMiddleWare.requireAuth, postCategoryRoutes);
    app.use(PATH_ADMIN + '/roles', authMiddleWare.requireAuth, roleRoutes);
    app.use(PATH_ADMIN + '/accounts', authMiddleWare.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + '/auth', authRoutes);

}

const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
const postRoutes = require("./post.route");
const postCategoryRoutes = require("./post-category.route");
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN +'/posts', postRoutes);
    app.use(PATH_ADMIN +'/posts-category', postCategoryRoutes);
}

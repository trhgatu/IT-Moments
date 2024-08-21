const dashboardRoutes = require("./dashboard.route");
const systemConfig = require("../../config/system");
const postRoutes = require("./post.route");
module.exports = (app) =>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN +'/dashboard', dashboardRoutes);
    app.use(PATH_ADMIN +'/posts', postRoutes);

}

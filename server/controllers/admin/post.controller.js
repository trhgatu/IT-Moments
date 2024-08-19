const Post = require("../../models/post.model");

const systemConfig = require("../../config/system");


/* [GET] /admin/posts */
module.exports.index = async (req, res) => {
    res.send("OK");
}
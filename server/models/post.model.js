const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
    title : String,
    post_category_id: {
        type: String,
        default: ""
    },
    description: String,
    thumbnail: String,
    video: String,
    status: String,
    position: Number,
    images: [String],

    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    createdBy :{
        account_id: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedBy :{
        account_id: String,
        deletedAt: Date
    },

},{
    timestamps: true,
});
const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
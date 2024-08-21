const mongoose = require('mongoose');
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const postSchema = new mongoose.Schema({
    title : String,
    description: String,
    thumbnail: String,
    video: String,
    status: String,
    images: [String],
    deleted: {
        type: Boolean,
        default: false
    },
    slug:{
        type: String,
        slug: "title",
        unique: true
    },
    deletedAt: Date,
    position: Number,
},{
    timestamps: true,
})
const Post = mongoose.model('Post', postSchema, 'posts');

module.exports = Post;
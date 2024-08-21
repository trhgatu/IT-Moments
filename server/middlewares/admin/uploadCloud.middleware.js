var cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
});

module.exports.upload = async (req, res, next) => {
    console.log('Bắt đầu xử lý tải lên...');

    // Xử lý thumbnail
    if (req.files && req.files['thumbnail'] && req.files['thumbnail'][0]) {
        const thumbnail = req.files['thumbnail'][0];

        const streamUpload = (file) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        };

        try {
            const result = await streamUpload(thumbnail);
            req.body.thumbnail = result.secure_url;
            console.log('Tải lên thumbnail thành công:', result.secure_url);
        } catch (error) {
            console.error('Lỗi tải lên thumbnail:', error);
            return next(error);
        }
    } else {
        console.log('Không tìm thấy thumbnail để tải lên');
    }

    // Xử lý images (thư viện ảnh)
    if (req.files && req.files['images']) {
        const images = req.files['images'];

        const uploadPromises = images.map(file => new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream((error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    console.error('Lỗi tải lên image:', error);
                    reject(error);
                }
            });
            streamifier.createReadStream(file.buffer).pipe(stream);
        }));

        try {
            const results = await Promise.all(uploadPromises);
            req.body.images = results.map(result => result.secure_url);
            console.log('Tải lên images thành công:', req.body.images);
        } catch (error) {
            console.error('Lỗi tải lên images:', error);
            return next(error);
        }
    } else {
        console.log('Không tìm thấy images để tải lên');
    }

    // Xử lý video
    if (req.files && req.files['video'] && req.files['video'][0]) {
        const video = req.files['video'][0];

        const streamUpload = (file) => {
            return new Promise((resolve, reject) => {
                // Specify resource_type: 'video' for video uploads
                const stream = cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        };

        try {
            const result = await streamUpload(video);
            req.body.video = result.secure_url;
            console.log('Tải lên video thành công:', result.secure_url);
        } catch (error) {
            console.error('Lỗi tải lên video:', error);
            return next(error);
        }
    } else {
        console.log('Không tìm thấy video để tải lên');
    }

    next();
};

const cloudinary = require('cloudinary').v2;
const { api_key, api_secret } = require('./constants').cloudinary

cloudinary.config({
    cloud_name: 'vilofence',
    api_key,
    api_secret,
    secure: true
});

module.exports = cloudinary.uploader
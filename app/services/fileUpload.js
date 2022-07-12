const cloudinary = require('../config/cloudinary')

function getFileUrl(req) {

    let file;

    if (req.file) {
        const { filename } = req.file;
        file = "public/uploads/" + filename
    }

    return file

}

async function uploadCloudinary(req) {
    try{
        if (req.file) {
        const image = await cloudinary.upload(req.file.path);

        return image.secure_url;
        }
        else{
            return ''
        }

    }
    catch(err){
        return '';
    }
}

module.exports = {
    getFileUrl,
    uploadCloudinary
}
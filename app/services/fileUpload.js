function getFileUrl(req) {

    let file;

    if (req.file) {
        const { filename } = req.file;
        file = "public/uploads/" + filename
    }

    return file

}

module.exports = getFileUrl
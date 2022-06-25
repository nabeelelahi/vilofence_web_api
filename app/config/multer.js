const multer = require('multer')

const root = __dirname
  .replace(/[\\]/gim, '/')
  .replace('/backend/app/config', '/backend')

const storage = multer.diskStorage({
  destination: `${root}/public/uploads/`,
  filename: function (req, file, cb) {
    const fileSplit = file.originalname.split('.')
    const fileExtension = fileSplit[fileSplit.length - 1]
    cb(null, 'image-' + Date.now() + '.' + fileExtension)
  }
})

const upload = multer({
  storage: storage,
  limits: 52428800
})

const uploadMultiple = upload.fields([{ name: 'images', maxCount: 10 }, { name: 'files', maxCount: 10 }])

module.exports = { upload, uploadMultiple }

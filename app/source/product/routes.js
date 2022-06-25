const { router } = require('../../config/express')

const { BASE_URL } = require("../../config/constants")
const { upload } = require("../../config/multer")

const { get, create, update, remove } = require('./controllers')

const action = BASE_URL + 'product'

router.get(action, get);
router.post(action, upload.single('image'), create);
router.put(action, update);
router.delete(action, remove);

module.exports = router
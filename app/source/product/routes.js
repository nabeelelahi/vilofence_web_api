const { router } = require('../../config/express')

const { BASE_URL } = require("../../config/constants")

const { get, create, update, remove } = require('./controllers')

const action = BASE_URL + 'product'

router.get(action, get);
router.post(action, create);
router.put(action, update);
router.delete(action, remove);

module.exports = router
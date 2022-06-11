const { BASE_URL } = require('../config/constants')

const { router } = require('../config/express')

const { 
    workerLogin,
    registerHouses,
    registerChildren
} = require('../controllers/worker')

router.get(`${BASE_URL}/worker/GET/login/:email/:password`, workerLogin);

router.post(`${BASE_URL}/worker/POST/register-house`, registerHouses);

router.post(`${BASE_URL}/worker/POST/register-children`, registerChildren);

module.exports = router
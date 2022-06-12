const { router } = require('../config/express')

const { BASE_URL } = require("../config/constants")

const {
  adminLogin,
  getAllWorkers,
  registerWorkers,
  getHousesByStatus,
  getChildren,
  adminSearch
} = require('../controllers/admin')

router.get(`${BASE_URL}/admin/GET/login/:email/:password`, adminLogin);

router.get(`${BASE_URL}/admin/GET/all-workers`, getAllWorkers)

router.post(`${BASE_URL}/admin/POST/register-worker`, registerWorkers);

router.get(`${BASE_URL}/admin/GET/houses/:status`, getHousesByStatus)

router.get(`${BASE_URL}/admin/GET/children`, getChildren)

router.post(`${BASE_URL}/admin/GET/search/:collection`, adminSearch)

module.exports = router

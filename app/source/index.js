const lead = require('./lead/routes');
const category = require('./category/routes');
const product = require('./product/routes');
const user = require('./user/routes');
const messasge = require('./message/routes');

module.exports = {
    lead,
    category,
    product,
    user,
    messasge
}
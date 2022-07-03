const lead = require('./lead/routes');
const category = require('./category/routes');
const product = require('./product/routes');
const user = require('./user/routes');
const messasge = require('./message/routes');
const gate = require('./gate/routes');

module.exports = {
    lead,
    category,
    product,
    user,
    messasge,
    gate
}
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;
const { connectionString } = require('./constants')

const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(connectionString, connectionConfig);

module.exports = { client, ObjectID }
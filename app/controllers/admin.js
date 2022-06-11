const {
  client,
  ObjectId
} = require('../config/db')

const adminLogin = (req, res) => {
  const { email, password } = req.params;

  client.db("PWIS").collection("admin").findOne({ email }, function (err, result) {
    if (err) {
      res.json({
        success: false,
        message: err,
      });
    }
    if (!result) {
      res.json({
        success: false,
        message: "No existing user connected with this Email",
      });
    } else {
      if (String(result.password) === String(password)) {
        res.json({
          success: true,
          info: result,
        });
      }
      else {
        res.json({
          success: false,
          message: "password is incorrect"
        })
      }
    }
  });

  return res;
}

const getAllWorkers = (req, res) => {

  client.db("PWIS").collection("workers")
    .find({})
    .toArray((err, result) => {
      if (result) {
        res.json({
          success: true,
          data: result,
        });
      }
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      }
      if (!result) {
        res.json({
          success: true,
          message: "Ops, no users have been registered yet..",
        });
      }
    });

  return true

}

const registerWorkers = (req, res) => {

  const info = req.body

  client.db("PWIS").collection("workers").findOne(
      { email: info.email },
      function (err, result) {
          if (err) {
              res.json({
                  success: false,
                  message: err,
              });
          }
          if (!result) {
              client.db("PWIS").collection("workers").insertOne(
                  info,
                  (error, result) => {
                      if (!error) {
                          res.json({
                              success: true,
                              message: "Account has been registered Succusfully",
                              info: info
                          });
                      } else {
                          res.json({
                              success: false,
                              message: error,
                          });
                      }
                  }
              );
          }
          else {
              res.json({
                  success: false,
                  message: "Ooops, there is already an account corresponding to this email.",
              });
          }
      }
  );

  return res;
}

const getHousesByStatus = (req, res) => {

  const { status } = req.params;

  client.db("PWIS").collection("houses")
    .find({ status: status })
    .toArray((err, result) => {
      if (result) {
        res.json({
          success: true,
          data: result,
        });
      }
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      }
      if (!result) {
        res.json({
          success: true,
          message: "Ops, no users have been registered yet..",
        });
      }
    });

  return true

}

const getChildren = (req, res) => {

  const { status } = req.params;

  client.db("PWIS").collection("children")
    .find({})
    .toArray((err, result) => {
      if (result) {
        res.json({
          success: true,
          data: result,
        });
      }
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      }
      if (!result) {
        res.json({
          success: true,
          message: "Ops, no users have been registered yet..",
        });
      }
    });

  return true

}

const adminSearch = (req, res) => {

    const { collection } = req.params

    const body = req.body

    client.db("PWIS").collection(collection)
      .find(body)
      .toArray((err, result) => {
        if (result) {
          res.json({
            success: true,
            results: result,
          });
        }
        if (err) {
          res.json({
            success: false,
            results: err,
          });
        }
        if (!result) {
          res.json({
            success: true,
            results: [],
          });
        }
      });

    return res;

}

module.exports = {
  adminLogin,
  getAllWorkers,
  registerWorkers,
  getHousesByStatus,
  getChildren,
  adminSearch
}
const {
    client,
    ObjectId
} = require('../config/db')

const workerLogin = (req, res) => {

    const { email, password } = req.params;

    client.db("PWIS").collection("users").findOne({ email }, function (err, result) {
        if (err) {
            res.json({
                success: false,
                message: err,
            });
        }
        if (!result) {
            res.json({
                success: false,
                message: `Opp, we could'nt find an account corresponding to this email ${email}`,
            });
        } else {
            if (String(result.password) === String(password)) {
                delete result.password;
                res.json({
                    success: true,
                    data: result,
                });
            }
            else {
                res.json({
                    success: false,
                    message: "Opss, Password is incorrect"
                })
            }
        }
    });

    return res;
}

const registerHouses = (req, res) => {

    const info = req.body

    client.db("PWIS").collection("houses").insertOne(
        info,
        (error, result) => {
            if (!error) {
                res.json({
                    success: true,
                    message: "House has been registered Succusfully",
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

    return res;
}

const registerChildren = (req, res) => {

    const info = req.body

    client.db("PWIS").collection("children").insertOne(
        info,
        (error, result) => {
            if (!error) {
                res.json({
                    success: true,
                    message: "Children has been registered Succusfully",
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

    return res;
}

module.exports = {
    workerLogin,
    registerHouses,
    registerChildren
}
const route = require('express').Router();
const dao = require('../modal/userDao')

var uemail = "asd@asd.com";

route.get('/', (req, res) => {
    dao.getUserById(uemail, "asd").then((user) => {
        res.json(user);
    })
})

route.post('/', (req, res) => {
    dao.createUser(req).then((result) => {
        res.json({
            user: result,
            success: true,
            msg: "User Created"
        })
    })
})

module.exports = route
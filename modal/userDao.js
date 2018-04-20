const User = require('./modals').User;

async function createUser(req) {
    return await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile
    });
}
async function getUserById(email,pass) {
    return await User.findOne({
        where: {
            email:email,
            password:pass
        },
        attributes:['id','name','email',]
    })
}


async function getUserWithId(id) {
    return await User.findOne({
        where: {

            id:id
        },
        attributes:['id','name','email',]
    })
}

module.exports = {
    createUser,getUserById,getUserWithId
}


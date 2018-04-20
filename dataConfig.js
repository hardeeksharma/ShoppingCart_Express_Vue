const Sequelize = require('sequelize');
const db = new Sequelize('shop', 'hardeek', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 15000
    }
})

module.exports = db;
const db = require('../dataConfig.js')
const Sequelize = require('sequelize');


const Product = db.define('product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull:false
    }
});

const Vendor = db.define('vendor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    }

});

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    mobile: Sequelize.STRING

});

const Cart = db.define('cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    qty:{
        type:Sequelize.INTEGER,
        defaultValue:1
    }
});

Product.belongsTo(Vendor);
Vendor.hasMany(Product,{onDelete:'cascade',hook:true});

Cart.belongsTo(Product);
Product.hasMany(Cart);

Cart.belongsTo(User,{through:'UserCart'});

async function f() {
    try {
        await db.authenticate();
        await db.sync();
    }
    catch (err) {
        console.log(err);
    }
}

f()

module.exports = {
    Cart,Product,User,Vendor
}

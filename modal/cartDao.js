const Product = require('./modals').Product;
const Vendor = require('./modals').Vendor
const Cart = require('./modals').Cart
const User = require('./modals').User

async function addToCart(product, user) {
    // const cart = await Cart.create({qty:1})
    return await Cart.findOrCreate({
        where: {
            userId: user.id,
            productId: product.id
        }
    }).spread((cart, created) => {
        if (created) {
            cart.setUser(user);
            cart.setProduct(product)
            return cart;
        }
        else {
            cart.increment({'qty': 1})
            return cart;
        }
    })
}

async function incrementQty(product, user) {
    return await Cart.findOne({
        where: {
            userId: user.id,
            productId: product.id
        }
    }).then((product) => {
        if (product)
            return product.increment(({'qty': 1}))
        else
            return null;
    })
}

async function decerementQty(product, user) {

    return await Cart.findOne({
        where: {
            userId: user.id,
            qty: {$ne: 1},
            productId: product.id
        }
    }).then(async (product) => {
        if (product)
            return product.decrement(({'qty': 1}))
        else
            return null;
    })
}

async function getCart(user) {
    return await Cart.findAll({
        where: {
            userId: user.id
        },
        attributes: ['qty', 'id'],
        include: [
            {
                model: Product,
                attributes: ['id', 'name', 'price']
            }
        ]
    })
}

async function getCartCount(uid) {
    return Cart.count({
        include: [{
            model: User,
            where: {
                id: uid
            }
        }]
    })
}

async function deleteItem(pid, uid) {
    return await Cart.destroy({
        where: {
            userId: uid,
            productId: pid
        }
    })
}

module.exports = {
    addToCart, incrementQty, decerementQty, getCart, getCartCount, deleteItem
}
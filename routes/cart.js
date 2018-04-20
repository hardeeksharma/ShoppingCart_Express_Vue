const route = require('express').Router();
const dao = require('../modal/cartDao')
const productDao = require('../modal/productDao')
const userDao = require('../modal/userDao')

var uid = 1;
/*route.use('/', (req, res,next) => {
    if (req.session.uid) {
        uid = req.session.uid;
        console.log(uid);
        next();
    }
    else {
        res.json({
            status: false,
            msg: 'Please Login To add product to cart'
        })
    }
})*/

route.get('/', (req, res) => {
    userDao.getUserWithId(uid).then(user => {
        dao.getCart(user).then(cart => {
            res.json(cart);
        })
    })
})

route.post('/', (req, res) => {
    var pid = req.body.pid;
    productDao.getProductById(pid).then(product => {
        userDao.getUserWithId(uid).then(user => {
            dao.addToCart(product, user).then(cart => {
                console.log(cart)
                res.json({
                    cartItem: cart,
                    success: true
                });
            })
        })
    })
})

route.get('/increment/:id', (req, res) => {
    var pid = req.params.id;
    productDao.getProductById(pid).then(product => {
        userDao.getUserWithId(uid).then(user => {
            dao.incrementQty(product, user).then(result => {
                if (result != null)
                    res.json({
                        product: result,
                        success: true
                    });
            })

        })
    })

})

route.get('/decrement/:id', (req, res) => {
    var pid = req.params.id;
    productDao.getProductById(pid).then(product => {
        userDao.getUserWithId(uid).then(user => {
            dao.decerementQty(product, user).then(result => {
                //console.log(cart)
                if (result != null)
                    res.json({
                        product: result,
                        success: true
                    });
                else
                    res.json({msg: 'Can not decrease less than 1', success: false})
            })
        })
    })
})

route.get('/count', (req, res) => {
    dao.getCartCount(uid).then((result) => {
        res.json({
            count: result
        })
    }).catch(err => res.json({error: err.toString()}))
})

route.delete('/:pid', (req, res) => {
    var pid = req.params.pid;
    dao.deleteItem(pid, uid).then(count => {

        if (count == 1) {
            res.json({
                count: count,
                success: true
            })
        }
        else
            res.json({
                count: 0,
                success: false
            })
    })
})

module.exports = route
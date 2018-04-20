const route = require('express').Router();
const dao = require('../modal/productDao')
const vendorDao = require('../modal/vendorDao')

route.post('/', (req, res) => {

    const vid = req.body.vid;
    vendorDao.getVendorById(vid).then((vendor) => {
        const vndr = vendor;
        dao.addProduct(req, vndr).then(product => {
            res.send({
                product: product,
                success: {
                    status: true
                }
            })
        }).catch(err => {
            res.json({status: false, err: err.toString()})
        })

    })

})

route.get('/', (req, res) => {
    try {
        dao.getAllProducts().then((result) => {
            res.json(result);
        })

    } catch (e) {
        res.status(400).json(e.toString())
    }
})

route.get('/vendor/:vid', (req, res) => {
    const vid = req.params.vid;
    dao.getVendorProducts(vid).then((products) => {
        res.json(products);
    }).catch(err => {
        res.status(400).json({
            error: err.toString(),
            status: false
        })
    })

})

route.get('/:id', (req, res) => {
    try {
        var id = req.params.id;
        dao.getProductById(id).then((result) => {

            if (result == null)
                throw Error("No Product found for ID " + id);
            res.json({
                product: result,
                status: true
            });
        }).catch(err => {
            res.status(400).json({
                error: err.toString(),
                status: false
            })
        })

    } catch (err) {
        res.status(400).json({
            error: err.toString(),
            status: false
        })
    }

})


route.delete('/:id/vendor/:vid', (req, res) => {
    try {
        const vid = req.params.vid;
        const id = req.params.id;
        dao.deleteProduct(id, vid).then(result => {
            if (result == 0)
                throw new Error("No product found for ID " + id)

            res.json({
                success: true,
                msg: "Product deleted",
                result: result.toString()
            });
        }).catch(err => {
            res.status(400).json({
                error: err.toString(),
                status: false
            })
        })

    } catch (err) {
        res.status(400).json({
            error: err.toString(),
            status: false
        })
    }
})


module.exports = route;
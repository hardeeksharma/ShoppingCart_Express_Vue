const route = require('express').Router();
const dao = require('../modal/vendorDao')

route.get('/', (req, res) => {
    dao.getVendors().then((result) => {
        res.json(result);
    })
})

route.post('/', (req, res) => {
    dao.createVendor(req.body.name).then(result => {
        res.json({
            vendor: result,
            success: {
                status: true,
                msg: "New Vendor Created"
            }
        });
    }).catch(err => {
        res.json({
            error: {
                status: false,
                msg: "Vendor Creation Failed"
            }
        })
    })
})

route.get('/:id', (req, res) => {

    dao.getVendorById(req.params.id).then((result) => {
        if (result == null)
            throw Error();
        res.status(200).json(result);
    }).catch(err => {
        res.status(400).json({
            status: false,
            msg: 'No vendor found for id ' + req.params.id
        })
    })

})

route.delete('/:id', (req, res) => {
    try {
        var id = req.params.id;
        dao.deleteVendor(id).then(result => {
            if (result === 0) throw Error('No Vendor found for id ' + id);
            res.json(result);
        }).catch(err => {
            console.log("in catch" + err)
            res.status(400).send({
                error: err.toString()
            });
            res.end();
        })
    } catch (err) {
        res.status(400).json(err.toString());
    }

})

module.exports = route;
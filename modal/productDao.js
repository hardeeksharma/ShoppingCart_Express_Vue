const Product = require('./modals').Product;
const Vendor = require('./modals').Vendor


async function addProduct(req, vendor) {
    const product = await Product.create({
        name: req.body.name,
        price: req.body.price
    });
    return new Promise((resolve) => {

        try {
            product.setVendor(vendor);
            resolve(product);
        } catch (err) {
            reject("Unable to add vendor to product");
        }

    })

}

async function getAllProducts() {
    return await Product.findAll({
        attributes: ['name', 'id', 'price'],
        include: [{
            model: Vendor,
            attributes: ['name']
        }]
    })
}

async function getProductById(id) {
    return await Product.findOne({
        where: {
            id: id
        },
        attributes: ['name', 'id', 'price'],
        include: [{
            model: Vendor,
            attributes: ['name']
        }]
    })
}

async function deleteProduct(id, vid) {
    return await Product.destroy({
        where: {
            id: id
        },
        include: [{
            model: Vendor,
            where: {
                id: vid
            }
        }]
    })
}

async function getVendorProducts(vid) {
    return await Product.findAll({
        attributes: ['name', 'id', 'price'],
        include: [{
            model: Vendor,
            attributes: ['name','id'],
            where: {
                id: vid
            }
        }]
    })
}

module.exports = {
    getAllProducts, getProductById, deleteProduct, addProduct, getVendorProducts
}
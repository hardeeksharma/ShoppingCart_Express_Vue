const Vendor = require('./modals').Vendor;

//GET LIST OF ALL THE VENDORS
async function getVendors() {
    return await Vendor.findAll({
        attributes:['id','name']
    });
}

// CREATE NEW VENDOR
async function createVendor(name) {
    var vendor = new Vendor({name: name})
    return await vendor.save();
}

//GET VENDOR BY ITS ID
async function getVendorById(id) {
    return await Vendor.findOne({
        where: {
            id: id
        }
    });
}

//DELETE VENDOR AS PER ITS ID
async function deleteVendor(id) {
    return await Vendor.destroy({
        where: {
            id: id
        }
    })
}

module.exports = {
    getVendors, createVendor, getVendorById, deleteVendor
}
const Role = require('../models/roles');


const rolesController = {};

//register
rolesController.create = async (req, res) => {
    const body = req.body
    const role = await Role.create(body)
    res.status(200).json(role)

    
}

//all role 
rolesController.fetchAll = async (req, res) => {
    const role = await Role.find()
    res.status(200).json(role);
    
}

module.exports = rolesController;
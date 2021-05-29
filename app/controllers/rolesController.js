const Role = require('../models/roles');


const rolesController = {};

//register
rolesController.create = async (req, res) => {
    const body = req.body
     console.log(body,'bb')
    const role =await Role.create(body)
     console.log(role, 'user') 
         res.status(200).json(role)

    
}

rolesController.fetchAll = async (req, res) => {

    const role =await Role.find()
     console.log(role, 'user') 
         res.status(200).json(role);
    
}

module.exports = rolesController;
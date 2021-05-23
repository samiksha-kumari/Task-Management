const User = require('../models/users')
const jwt = require("jsonwebtoken")


const authenticateUser = (req, res, next) => {
    if(req.header("x-auth")) {
        const token = req.header("x-auth")
    let tokenData
    try {
        tokenData = jwt.verify(token, 'jwt@2456')
        User.findById(tokenData.id)
            .then(user => {
                if(user) {
                    req.user = user,
                    req.token = token,
                    next()
                }else {
                    res.status("401")
                }
            })
            .catch(err => {
                res.json(err)
            })
        }catch(error){
            res.json(error.message)
        }
    }else{
            res.json({errors:"token not provided"})
        }
} 

module.exports = {authenticateUser}
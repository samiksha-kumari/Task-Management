const User  = require('../models/users')
const jwt = require("jsonwebtoken")

const authenticateUser = (req, res, next) => {
    // console.log(req.headers,'headers',req)

    if(req.header('x-auth')) {
        const token = req.header('x-auth')
     console.log(token,'token')
        let tokenData
     try {
        tokenData = jwt.verify(token, 'jwt@2456')
        // console.log(tokenData)
        User.findOne({_id:tokenData._id}).populate('role')
            .then(user => {
                if(user) {
                    req.user = user,
                    req.token = token,
                    next()
                }
            })
            .catch(err => {
                res.json(err)
            })
        }
        catch(err){
            res.json(err)
        }
    }else{
        res.status("401").send({ notice: "token is not available" });
        }
} 

module.exports = {authenticateUser}
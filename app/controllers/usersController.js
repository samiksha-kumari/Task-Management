const User = require('../models/users');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const usersController = {};


usersController.fetchAll = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}

//register
usersController.register = async (req, res) => {
    const body = req.body
    //  console.log(body,'body')
    const user = await User.create(body)
    //  console.log(user, 'user') 
         res.status(200).json(user)
}

//login
usersController.login = (req, res) => {
    const body = req.body
    User.findOne({email: body.email}).populate('role')
        .then(user => {
            // console.log(user)
            if(!user) {
                res.json({
                    errors: 'invalid email or password'
                })
            }
            bcryptjs.compare(body.password, user.password)
                    .then(match => {
                        if(match) {
                            const tokenData =  {
                                _id: user._id,
                                 email: user.email,
                                 username: user.username
                            }
                 const token = jwt.sign(tokenData, 'jwt@2456', {expiresIn : '2d'})
                 res.json({
                     ...user.toObject(),
                     token: `${token}`
                 })
              }else {
                  res.json({errors: 'invalid email or passwords'})
              }
           })
        })

}

//account
usersController.account = (req, res) => {
    const {user} = req
    res.send = user
}


usersController.fetchByToken = (req, res) => {
    const {user} = req
res.status(200).json(user)}



module.exports = usersController
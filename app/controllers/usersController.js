const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

const usersController = {};

//register
usersController.register = (req, res) => {
    const body = req.body;
    const user = new User(body)
     user.save()
        .then(user => {
            res.json(user)
        })
        .catch(err => {
            res.json(err)
        })
}

//login
usersController.login = (req, res) => {
    const body = req.body;
    User.findOne({email: body.email})
        .then(user => {
            if(!user) {
                res.json({
                    error: 'invalid email or password'
                })
            }
            bcryptjs.compare(body.password, user.password)
                    .then(match => {
                        if(match) {
                            const tokenData =  {
                                _id = user._id,
                                 email = user.email,
                                 username = user.username
                            }
                 const token = jwt.sign(tokenData, 'jwt2456', {expiresIn : '2d'})
                 res.json({
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

usersController.logout = (req, res) => {
    const {user, token} = req
    User.findByIdAndUpdate(user._id, { $pull : { tokens: { token: token}}  })
        .then(() => {
            res.json('Successfully Logged Out')
        })
        .catch(err => {
            res.json(err)
        })
}
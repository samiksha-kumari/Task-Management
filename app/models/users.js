const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return isEmail(value);
            },
            message: function(){
                return "invalid email format";
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 128
    },
    role: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:'Role'
        // ref : 'Role', required 'true'
    }
})

//prehooks
userSchema.pre('save', function(next) {
    const user = this;
    if(user.isNew) {
        bcryptjs.genSalt()
                .then(salt => {
                    bcryptjs.hash(user.password, salt)
                            .then(encrypt => {
                                user.password = encrypt
                                next()
                            })
                })  
    }else {
        next();
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;
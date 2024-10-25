const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const Users = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name'],
            maxLength: [30, "Name can not be exceed 30 character"],
            minLength: [5, "Name should have 5 character"]
        },
        email: {
            type: String,
            required: [true, 'Please enter email'],
            unique: true,
            validate: [
                {
                    validator: function (email) {
                        return validator.isEmail(email);
                    },
                    message: props => `${props.value} is not a valid email address`
                },
                {
                    validator: function (email) {
                        return email.split('@').length - 1 === 1;
                    },
                    message: props => `${props.value} contains multiple '@' symbols`
                }
            ]
        
        },
        password: {
            type: String,
            required: [true, 'Please enter password'],
            minLength: [8, 'Password must be grater the 8 character'],
            select: false, // password should not be show
        },
        avatar: {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        role: {
            type: String,
            default: "user"
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        resetPasswordToken: String,
        resetPasswordExpire: Date,
    }
);


Users.methods.comparePassword = async function (enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);
};

Users.methods.getJwtToken =  function () {

   return  jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES
    });
}
Users.methods.getResetPasswordToken = async function(){

    // Genearting token
        const resetToken = crypto.randomBytes(20).toString("hex");//hex is used to manage buffer value
    
    //Hashing and adding to user Schema
       this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');//sha256 is a cryptographic hash function from the SHA-2 family of hash functions. 
       this.resetPasswordExpire = Date.now()+15*60*1000
       return resetToken;
    }

    
Users.pre("save", async function (next) {

    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

module.exports = mongoose.model("users", Users);
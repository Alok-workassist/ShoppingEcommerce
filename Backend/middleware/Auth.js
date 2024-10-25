
const ErrorHandler = require("../Utils/ErrorHandler");
const catchAsyncEror = require("../middleware/AsyncError");
const jwt = require('jsonwebtoken');
const Users = require("../model/UserModel");



exports.isAuthanticatedUsers = catchAsyncEror(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        next(new ErrorHandler(201, "Please login to access this resource"));
    }

    const decodeData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Users.findById(decodeData.id);
    next();

});

exports.isAuthorizeRole = (...roles)=>{
    return (req, res, next) => {

        if(!roles.includes(req.user.role))
            {
                next(new ErrorHandler(201, `Role ${req.user.role} is not have access to this resource`)); 
            }
            next();
    }

}
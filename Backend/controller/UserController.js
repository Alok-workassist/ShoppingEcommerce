const catchAsyncEror = require("../middleware/AsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");
const Users = require("../model/UserModel");
const { message } = require("statuses");
const sendToken = require("../utils/jwtToken");
const sendEmail = require('../utils/SendEmails');
const cloudinary = require('cloudinary');


const jwt = require('jsonwebtoken');
const crypto = require('crypto');


exports.create_users = catchAsyncEror(async (req, res, next) => {

    const { name, email, password } = req.body;
 
    // Upload to Cloudinary
    const myCloud = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
        folder: "/avatars",
        width: 150,
        crop: "scale",
    });

    const user = await Users.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        }
    });
    res.status(200).json({
        success: true,
        user
    });
});

exports.all_users = catchAsyncEror(async (req, res, next) => {

    const user = await Users.find();
    res.status(200).json({
        success: true,
        user
    });
});

exports.user_login = catchAsyncEror(async (req, res, next) => {

    const { email, password } = req.body;

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler(201, "Please enter valid email and password"));
    }

    isPasswordmatched = await user.comparePassword(password)


    if (!isPasswordmatched) {
        return next(new ErrorHandler(201, "Please enter valid email and password"));
    }
    const message = "Login successfully";

    sendToken(user, 200, message, res);

});

exports.user_logout = catchAsyncEror(async (req, res, next) => {

    res.cookie("token", null,
        {
            httpOnly: true,
            expires: new Date(Date.now()),
        })

    res.status(200).json({
        success: true,
        message: "logout successfully"
    });

});

exports.forgot_password = catchAsyncEror(async (req, res, next) => {
    const { email } = req.body;

    const user = await Users.findOne({ email });

    if (!user) {
        return next(new ErrorHandler(201, "No user found with this email"));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    // const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocaol}://${req.get('host')}/password/reset/${resetToken}`;

    const message = `You Password reset password token is :-\n\n ${resetPasswordUrl} \n\n if you have not requested this email then ,please ignore it`



    try {
        await sendEmail({
            subject: "Ecommerce Password Recovery ",
            message,
            email: user.email
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`
        });

    } catch (error) {

        user.resetPasswordToken = undefined,
            user.resetPasswordExpire = undefined,
            await user.save({ validateBeforeSave: false });
        if (error) {
            return next(new ErrorHandler(201, `Email to ${email} not send`));
        }
    }
});

exports.reset_password = catchAsyncEror(async (req, res, next) => {


    const token = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await Users.findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler(201, 'Reset password token is invalid or has been expired'));
    }

    if (req.body.password != req.body.confirmpassword) {
        return next(new ErrorHandler(201, 'Password is not matching confirmation password'));
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined

    user.save();
    res.status(200).json({
        success: true,
        message: "Password Updated scuccessfully"
    });

});


exports.user_details = catchAsyncEror(async (req, res, next) => {
    const user = await Users.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler(201, 'User not found'));
    }

    res.status(200).json({
        success: true,
        message: "User details retreived scuccessfully",
        user
    });
});



exports.update_password = catchAsyncEror(async (req, res, next) => {

    const user = await Users.findById(req.user._id).select("+password");
    if (!user) {
        return next(new ErrorHandler(201, 'User not found'));
    }
    const isPasswordmatched = await user.comparePassword(req.body.newPassword);
    if (isPasswordmatched) {
        return next(new ErrorHandler(201, 'Password is matched to old password'));
    }
    if (req.body.newPassword != req.body.confirmPassword) {
        return next(new ErrorHandler(201, 'NewPassword should be matched to confirm Password'));
    }

    user.password = req.body.newPassword;
    try {
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Password updated successfully',
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            return next(new ErrorHandler(400, error.errors.password.message));
        }
        return next(new ErrorHandler(500, 'Internal Server Error'));
    }
});


exports.update_profile = catchAsyncEror(async (req, res, next) => {
    // Step 1: Get the current user data
    const user = await Users.findById(req.user._id);
    if (!user) {
        return next(new ErrorHandler(404, 'User not found'));
    }

    // Step 2: Prepare the updated user data
    const new_userdata = {
        name: req.body.name,
        email: req.body.email
    };

    // Step 3: Check if an avatar file is uploaded
    if (req.files && req.files.avatar && req.files.avatar.tempFilePath) {
        // Step 4: Delete the existing avatar from Cloudinary
        if (user.avatar.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        // Step 5: Upload the new avatar to Cloudinary
        const myCloud = await cloudinary.uploader.upload(req.files.avatar.tempFilePath, {
            folder: "/avatars",
            width: 150,
            crop: "scale",
        });

        // Step 6: Update avatar in new user data
        new_userdata.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
        };
    }

    // Step 7: Update the user profile in the database
    const updatedUser = await Users.findByIdAndUpdate(req.user._id, new_userdata, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    if (!updatedUser) {
        return next(new ErrorHandler(404, 'User not found'));
    }

    // Step 8: Send response
    res.status(200).json({
        success: true,
        message: "Profile updated successfully",
    });
});

exports.single_user = catchAsyncEror(async (req, res, next) => {

    const user = await Users.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(201, 'User not found'));
    }

    res.status(200).json({
        success: true,
        message: "User details retrieved successfully",
        user
    });
});
module.exports.update_user_profile = catchAsyncEror(async(req,res,next)=>{

    const newUserData = {
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    }    
   
    const user = await Users.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,useFindAndModify:false,
    });
    
    res.status(200).json({
        success:true,
        message:"Profile updated successfully",
        user
    });
    });

// update user profile By Admin
module.exports.delete_user = catchAsyncEror(async(req,res,next)=>{
   
   
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) {
        return next(new ErrorHandler(201,'User does not exist with this id'));
    }
    const imageId = user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(imageId);

    
    res.status(200).json({
        success:true,
        message:"Profile deleted successfully"
    });
    });
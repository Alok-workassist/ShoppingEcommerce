const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter product price']
        },
        description: {
            type: String,
            required: [true, 'Please enter product description']
        },
        price: {
            type: Number,
            required: [true, 'Please enter product price'],
            maxLength: [4, 'price can not exceed 4 character']
        },
        category: {
            type: String,
            required: [true, 'Please enter product category']
        },
        stocks: {
            type: Number,
            default: 1,
            maxLength: [8, 'stock can not exceed 8 character']
        },
        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }],
        ratings: {
            type: Number,
            default: 0
        },
        reviews: [{
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true,
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String
            },
            rating: {
                type: Number,
                required: true
            }
        }],
       
        numOfReviews: {
            type: Number,
            default: 0
        },
        user:{
            type:mongoose.Schema.ObjectId,
            ref:"users",
            required:true
        },
        created_at: {
            type: Date,
            default: Date.now
        }

    }

);

module.exports = mongoose.model('Products', ProductModel);
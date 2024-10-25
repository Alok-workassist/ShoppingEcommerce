const ProductModel = require("../model/ProductModel");
const catchAsyncEror = require("../middleware/AsyncError");
const ApiFeatures = require("../utils/ApiFeatures");
const ErrorHandler = require("../Utils/ErrorHandler");

const cloudinary = require('cloudinary');

exports.getAllProducts = catchAsyncEror(async (req, res, next) => {
    const resultPerPage = 4;
    const apiFeatures = new ApiFeatures(ProductModel.find(), req.query)
        .search()
        .filter();

    // Execute the query once to get filtered products count
    let filterProducts = await apiFeatures.query.clone();
    const filteredProductCount = filterProducts.length;

    // Apply pagination after filtering and searching
    apiFeatures.pagination(resultPerPage);
    let products = await apiFeatures.query;

    // Get the total product count
    const productCount = await ProductModel.countDocuments();

    res.status(200).json({
        success: true,
        products,
        productCount,
        resultPerPage,
        filteredProductCount
    });
});
exports.getAdminAllProducts = catchAsyncEror(async (req, res, next) => {
    const apiFeatures = new ApiFeatures(ProductModel.find());
    let products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        products,
    });
});

exports.createProduct = catchAsyncEror(async (req, res, next) => {

    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images);
    }
    else if (req.body.images && Array.isArray(req.body.images)) {
        images = req.body.images;
    }
    if (images.length === 0) {
        return next(new ErrorHandler(201, "Please upload at least one image."));
    }
    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
        try {
            const result = await cloudinary.uploader.upload(images[i], {
                folder: "/products",
                width: 150,
                crop: "scale",
            });
            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            });
        } catch (err) {
            return next(new ErrorHandler(500, "Image upload failed. Please try again."));
        }
    }
    req.body.images = imagesLinks;
    req.body.user = req.user.id;
    const product = await ProductModel.create(req.body);
    if (!product) {
        return next(new ErrorHandler(201, "Product creation failed."));
    }
    res.status(200).json({
        success: true,
        product
    });
});

exports.updateProduct = catchAsyncEror(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(201, "Product not Found"));
    }

    let images = [];
    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }
    if (images !== undefined) {
        // Deleting Images From Cloudinary
        for (let i = 0; i < product.images.length; i++) {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
    
        const imagesLinks = [];
    
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });
    
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
    
        req.body.images = imagesLinks;
      }


    await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
        success: true,
        meassge: "Product updated successfully"
    });
});

exports.singleProduct = catchAsyncEror(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(201, "Product not Found"));
    }
    res.status(200).json({
        success: true,
        product
    });

});

exports.deletProduct = catchAsyncEror(async (req, res, next) => {

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
        return next(new ErrorHandler(201, "Product not Found"));
    }
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
        success: true,
        meassge: "Product deleted successfully",
    });
});

exports.product_review = catchAsyncEror(async (req, res, next) => {
    const { comment, rating, productId } = req.body;

    const product = await ProductModel.findById(productId);

    if (!product) {
        return next(new ErrorHandler(201, 'Product not found'));
    }

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating,
        comment,
    };

    const isReviewed = product.reviews.find(rev => rev.user && rev.user.toString() === req.user.id.toString());

    if (isReviewed) {
        product.reviews.forEach(rev => {
            if (rev.user && rev.user.toString() === req.user.id.toString()) {
                rev.rating = rating;
                rev.comment = comment;
            }
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach(rev => {
        if (rev.rating) {
            avg += rev.rating;
        }
    });

    let ratings = 0;
    if(product.reviews.length===0)
    {
        ratings=0;
    }else{
        product.ratings = avg / product.reviews.length;
    }

    product.numOfReviews = product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Review added successfully"
    });
});


module.exports.getProduct_reviews = catchAsyncEror(async (req, res, next) => {

    const product = await ProductModel.findById(req.query.id);
    if (!product) {
        return next(new ErrorHandler(201, "Product not found"));
    }
    res.status(200).json({
        status: 200,
        reviews: product.reviews,
    });
});

module.exports.deleteProduct_reviews = catchAsyncEror(async (req, res, next) => {
    const product = await ProductModel.findById(req.query.productId);
    if (!product) {
        return next(new ErrorHandler(404, "Product not found"));
    }

    const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

    let avg = 0;
    reviews.forEach(rev => {
        avg += rev.rating;
    });

    const ratings = reviews.length === 0 ? 0 : avg / reviews.length;
    const numOfReviews = reviews.length;

    await ProductModel.findByIdAndUpdate(
        req.query.productId,
        { reviews, numOfReviews, ratings },
        { new: true, runValidators: true, useFindAndModify: false }
    );

    res.status(200).json({
        success: true,
        message: "Review deleted successfully"

    });
});

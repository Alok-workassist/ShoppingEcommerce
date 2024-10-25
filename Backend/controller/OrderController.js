const ProductModel = require("../model/ProductModel");
const catchAsyncEror = require("../middleware/AsyncError");
const Order = require("../model/OrderModel");
const ErrorHandler = require("../Utils/ErrorHandler");
const { message } = require("statuses");

//Create New Order
exports.new_order = catchAsyncEror(async (req, res, next) => {
    const { shippingInfo, paymentInfo, orderItem, itemPrice, taxPrice, shippingPrice, totalPrice } = req.body

    const order = await Order.create({
        shippingInfo, paymentInfo, orderItem, taxPrice, shippingPrice, totalPrice, itemPrice,
        user: req.user._id,
        paidAt: Date.now()
    });

    res.status(200).json({
        success: true,
        order
    })
});

// Get Single Order
exports.single_order = catchAsyncEror(async (req, res, next) => {

    const order = await Order.findById(req.params.id).populate("user", "name email");
    //populate method is used to replace the specified paths in the document with document(s) from other collections.
    if (!order) {
        next(new ErrorHandler(201, 'Order not found'))
    }
    res.status(200).json({
        success: true,
        order
    })
})

// Get Logged in My Order
exports.my_order = catchAsyncEror(async (req, res, next) => {

    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        success: true,
        orders
    })
})


// get all orders my admin
exports.all_order = catchAsyncEror(async (req, res, next) => {

    const orders = await Order.find();

    let total = 0;

    orders.forEach(order => {
        total += order.totalPrice
    });

    res.status(200).json({
        success: true,
        orders,
        total
    })
})

// get update order my admin
exports.update_order = catchAsyncEror(async (req, res, next) => {

    const order = await Order.findById(req.params.id);
    order.orderItem.forEach(async o => {
        await updateStock(o.product, o.quantity)
    });

    if (order.orderStatus === "Deleivered") {
        next(new ErrorHandler(201, "Order Already delivered"))
    }

    if (order.orderStatus === "Deleivered") {
    order.orderItem.forEach(async o => {
        await updateStock(o.product, o.quantity)
    });
}

    order.orderStatus = req.body.status
    if (req.body.status === "Deleivered") {
        order.deliveredAt = Date.now()
    }
    await order.save({ validateBeforeSave: false })
    res.status(200).json({
        success: true,
    })
})

// get delete order by admin
exports.delete_order = catchAsyncEror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(404, "Order not found with this id"));
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });
});



async function updateStock(id, quantity) {
    const product = await ProductModel.findById(id);

    product.stocks -= quantity

    await product.save({ validatebeforeSave: false });
}
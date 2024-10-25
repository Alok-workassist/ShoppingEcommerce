const catchAsyncError = require("../middleware/AsyncError");
const ErrorHandler = require("../Utils/ErrorHandler");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process the payment intent using Stripe

// Process the payment intent using Stripe
exports.processPayment = catchAsyncError(async (req, res, next) => {
    const mypayment = await stripe.paymentIntents.create({
        amount: req.body.amount, // Amount should be in the smallest currency unit (e.g., paise for INR)
        currency: "inr",
        metadata: { 
            company: "Shopping"
        }
    });

    if (mypayment) {
        res.status(200).json({
            success: true,
            client_secret: mypayment.client_secret
        });
    } else {
        return next(new ErrorHandler(500, "Something went wrong"));
    }
});


// Send the Stripe public API key to the client
exports.sendStripeKey = catchAsyncError(async (req, res, next) => {
    try {
        res.status(200).json({
            stripeApiKey: process.env.STRIPE_API_KEY, // Make sure you have this key in your .env file
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to load Stripe API key" });
    }
});

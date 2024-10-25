const express = require("express");
const { isAuthanticatedUsers } = require("../middleware/Auth");
const { processPayment, sendStripeKey } = require("../controller/PaymentController");

const Router = express.Router();


Router.route("/payment/process").post(isAuthanticatedUsers,processPayment)
Router.route("/stripeapikey").get(isAuthanticatedUsers,sendStripeKey)

module.exports = Router;
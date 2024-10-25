const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');

const app = express();

if(process.env.NODE_ENV !="PRODUCTION")
    {
        require('dotenv').config({path:'Backend/config/config.env'});
    
    }
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: '2mb' })); // Limit for URL-encoded data
app.use(express.json({ limit: '2mb' })); // Limit for JSON data
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit for file uploads
}));


// Middleware

const errorMiddleware = require('./middleware/Error');

// Route imports
 const Products = require('./route/ProductRoute');
 const Users = require('./route/UserRoute');
 const Orders = require('./route/OrderRoute');
 const Payments = require('./route/PaymentRoute');

 app.use('/api/v1/',Products);
 app.use('/api/v1/',Users);
 app.use('/api/v1/',Orders);
 app.use('/api/v1/',Payments);

//  app.use(express.static(path.join(__dirname,"../frontend/shopping-ecommerce/")));
//  app.get("*",(req,res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/shopping-ecommerce/index.html"));
//  })

app.use(errorMiddleware);

module.exports = app;
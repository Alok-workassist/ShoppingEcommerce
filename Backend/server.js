const app = require('./app');

const cloudinary = require('cloudinary');

if(process.env.NODE_ENV !="PRODUCTION")
{
    require('dotenv').config({path:'Backend/config/config.env'});

}

// Connect Database

const connectDatabase = require('./config/database');

// uncaught error


process.on('uncaughtException',(err)=>{
    console.log('Error:',err.message);
    console.log(`Server is shuting down due to Uncaught Promise Rejection`);
    process.exit(1);


})
// console.log(youtube);

connectDatabase();
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});

const server = app.listen(process.env.PORT,(data)=>{
    console.log(`Server is running on Port http://localhost:${process.env.PORT}`);
});

//Unhandled rejection errror database
process.on('unhandledRejection',(err)=>{
    console.log('Error:' ,err.message);
    console.log(`Server is shuting down due to Unhandled Promise Rejection`);
    server.close(()=>{
        process.exit();
    })

})

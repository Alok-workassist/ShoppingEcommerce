const ErrorHandler = require('../Utils/ErrorHandler')

module.exports = async (err, req, res, next) => {
   
    // "Cast to ObjectId failed  Cast error in case when id is small as required in url api

    // Handle CastError (e.g., invalid ObjectId in URL)
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal server error';
    
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`;
        err = new ErrorHandler(404, message); // Use 404 for not found errors
    }
    
        
    res.status(err.statusCode).json({
        success: false,
        status: err.statusCode,
        message: err.message
    });
};
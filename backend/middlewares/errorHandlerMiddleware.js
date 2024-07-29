
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200?500: res.statusCode; //If the status code is 200, then set the status code to 500, else set it to the response status code
    res.status(statusCode); //Set the response status code to the status code
    res.json({
        message: err.message,
        stack: err.stack,    //stack trace on which line of the error occurred
    });
};

module.exports = errorHandler; //Export the errorHandler object
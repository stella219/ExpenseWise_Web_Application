
const errorHandler = (err, req, res, next) => {
    res.json({
        message: err.message,
        stack: err.stack,    //stack trace on which line of the error occurred
    });
};

module.exports = errorHandler; //Export the errorHandler object
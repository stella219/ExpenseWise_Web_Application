const express = require("express");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRouter');
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");
const transactionRouter = require("./routes/transactionRouter");
const app = express();

//!Connect to mongodb
//mongodb username: zhangstella
//mongodb password: amccbPjVE7dabwqO
//mongodb connection string: mongodb+srv://zhangstella:amccbPjVE7dabwqO@expenses.xhj6zas.mongodb.net/?retryWrites=true&w=majority&appName=expenses
mongoose
.connect('mongodb+srv://zhangstella:amccbPjVE7dabwqO@expenses.xhj6zas.mongodb.net/mern-expenses')                                  //pass in the mongodb connection string
.then(() => console.log('DB Connected'))
.catch((e) => console.log(e));

//!!Middleware
app.use(express.json()); //?Pass incoming json data

//!Routes
app.use('/', userRouter);
app.use('/', categoryRouter);
app.use('/', transactionRouter);

//!Error Handler
app.use(errorHandler);

//!Start the server
const PORT = process.env.PORT || 8000; //Define the port number
app.listen(PORT,() => console.log(`Server running on port ${PORT}`)); //Listen to the port number and log a message to the console

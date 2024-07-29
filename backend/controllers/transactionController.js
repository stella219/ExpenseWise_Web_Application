const asyncHandler = require('express-async-handler'); //Simplify the process of error handling in asynchronous functions
const Category = require('../model/Category'); //Import the Category model
const Transaction = require('../model/Transaction'); //Import the Transaction model 
  
const transactionController = {
    //!Add
    create: asyncHandler(async(req,res) => {
        const {type, category, amount, date, description} = req.body;
        if (!type || !amount || !date){
            throw new Error("Type, amount and date are required.");
        }
        //!Create transaction
        const transaction = await Transaction.create({
            user: req.user,
            type,
            category,
            amount,         
            description,
            date,
        });
        res.status(201).json(transaction);   //Send the response
    }),

    //!list
    getFilteredTransactions: asyncHandler(async(req,res) => {
        const {startDate, endDate, type, category} = req.query;
        let filters = {user: req.user};
        if (startDate){
            filters.date = {...filters.date, $gte: new Date(startDate)};  //Greater than or equal to startDate
        }
        if (endDate){
            filters.date = {...filters.date, $lte: new Date(endDate)};  //Less than or equal to endDate
        }
        if (type){
            filters.type = type;
        }   
        if (category){
            if (category === "All"){
                //No category filter needed when filtering for "All"
            }else if (category === "Uncategorized"){
                filters.category = "Uncategorized";

            }else{
                filters.category = category;
            }  
        } 
        const transactions = await Transaction.find(filters).sort({date:-1});  //Sort by date in descending order  
        res.json(transactions);
    }),   

    //!update
    update: asyncHandler(async(req,res) => {
        //!Find the transaction
        const transaction = await Transaction.findById(req.params.id);
        if ( transaction && transaction.user.toString() === req.user.toString()) {
            (transaction.type = req.body.type || transaction.type),
            (transaction.category = req.body.category || transaction.category),
            (transaction.amount = req.body.amount || transaction.amount),
            (transaction.date = req.body.date || transaction.date),
            (transaction.description =req.body.description || transaction.description);
            //update
            const updatedTransaction = await transaction.save();     //Save the updated transaction
            res.json(updatedTransaction);
        }   
    }),
    //!delete
    delete: asyncHandler(async(req,res) => {
        const transaction = await Transaction.findById(req.params.id);
        if (transaction && transaction.user.toString() === req.user.toString()) {
            await Transaction.findByIdAndDelete(req.params.id);
            res.json({ message: 'Transaction removed' });
        } 
    }),
};

module.exports = transactionController; //Export the categoryController object
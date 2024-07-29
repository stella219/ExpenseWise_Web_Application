

const asyncHandler = require('express-async-handler'); //Simplify the process of error handling in asynchronous functions
const bcrypt = require('bcryptjs'); //Import the bcryptjs library used to hash passwords
const jwt = require('jsonwebtoken'); //Import the jsonwebtoken library to generate a token
const User = require("../model/User") //Import the User model


//!User Registration

const userController = {
    //!Register
    register: asyncHandler(async(req,res) => {
        const {username, email, password} = req.body
        
        //!Validate
        if (!username || !email || !password) {
            throw new Error("Please fill in all fields");
        }

        //!Check if the user already exists
        const userExists = await User.findOne({email});
        if (userExists) {
            throw new Error("User already exists");
        }

        //!Hash the password
        //Generate a salt with 10 of rounds(complexity factor). Even two users have the same password but hashed is different because unique salt
        //A salt is random string that is added to the password before hashing. 
        const salt = await bcrypt.genSalt(10); 
        const hashedPassword = await bcrypt.hash(password, salt); //Generate a hashed password
    
        //!Create the user and save into db
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        //!Send the response
        res.json({
            username:userCreated.username,
            email: userCreated.email,
            id: userCreated._id,
        });
    }),

    //!Login
    login: asyncHandler(async(req,res) =>{
        //!Get the user data
        const {email,password} = req.body;
        //! if email is valid
        const user = await User.findOne({email});
        if (!user) {
            throw new Error("Invalid login credentials");
        }
        //!Compare the user password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error("Invalid login credentials");
        }
        //!Generate a token
        //JWT is JSON Web token. It is a URL-safe means of representing claims to be transferred between two parties. 
        //The claims in JWT are encoded as JSON object that is digitally signed using a secret or public/private key pair using RSA or ECDSA.
        //The JWT token is used for authentication and authorization in web application. 
        //The authentication is when user logs in credentials, the server would verifies the credentials and if valid, generates a JWT token. The token is sent back to client.
        //The client stores the token typically in local storage or cookies, then includes it in the headers of subsequent requests to authenticate the user.
        //Authorization: JWT token contain key-value pairs that provide information about users and their permission. When making request to access protected resources, the server checks the token to determine if the user is authorized to access the requested resources.
        const token = jwt.sign({id: user._id},"masynctechKey",{
            expiresIn: "30d",
        });
        //!Send the response
        res.json({
            message:'Login Successful',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        });
    }),  

    //!Profile
    profile: asyncHandler(async(req,res) => {
        //!Find user
        console.log(req.user);
        const user = await User.findById(req.user);
        if (!user) {
            throw new Error("User not found");
        }
        //!Send the response
        res.json({
            username: user.username,
            email: user.email,
        });
    }),
    //! Change password
    changeUserPassword: asyncHandler(async (req, res) => {
        const { newPassword } = req.body;
        //! Find the user
        const user = await User.findById(req.user);
        if (!user) {
        throw new Error("User not found");
        }
        //! Hash the new password before saving
        //!Hash the user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        //! ReSave
        await user.save({
        validateBeforeSave: false,
        });
        //!Send the response
        res.json({ message: "Password Changed successfully" });
    }),
    //! update user profile
    updateUserProfile: asyncHandler(async (req, res) => {
        const { email, username } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
        req.user,
        {
            username,
            email,
        },
        {
            new: true,
        }
        );
        res.json({ message: "User profile updated successfully", updatedUser });
    }),
};

module.exports = userController; //Export the usersController object
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        // checking if user exists
        const user = await userModel.findOne({email})
        if (!user) {
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({success:false, message:"Invalid credentials"})
            
        }
        const token = createToken(user._id);
        res.json({success:true,token})
    }
        catch (error) {
            console.log(error);
            res.json({success:false, message:"Something went wrong"})
        }

}


// Create Token
const createToken = (id) => {
    const jwtSecretKey = process.env.JWT_SECRET;
    return jwt.sign({id}, jwtSecretKey)
}

// Register user
const registerUser = async (req,res) => {
    const {name,email,password} = req.body
    try {
        // checking if user already exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false, message:"User already exists"})
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"})
        }

        if(password.length < 8) {
            return res.json({success:false, message:"Please enter a strong password"})
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        // creating new user
        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        // saving new user in db
      const user =  await newUser.save()

      const token = createToken(user._id)
      res.json({success:true, message:"User created successfully", token:token})

       
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error creating user"})
    }

}

export {loginUser,registerUser};
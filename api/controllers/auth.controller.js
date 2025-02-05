import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
export const Signup = async (req, res,next) => {
const {username,email,password}=req.body;
const hashPassword=bcrypt.hashSync(password,10);
const newUser=new User({username,email,password:hashPassword});
try{
    await newUser.save();
    res.status(201).json("User created successfully")
} catch(error)
{
   next(error);
}

};

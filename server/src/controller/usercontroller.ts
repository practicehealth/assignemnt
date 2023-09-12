import User from '../models/userschema'
import bcrypt from "bcrypt"
import { Request, Response } from 'express';


export const signupuser = async (req: Request, res: Response) => {

    try {
        // const salt=await bcrypt.genSalt(10);
        // console.log(salt);
        const hashpasswd = await bcrypt.hash(req.body.password, 10);
        const user = {
            fullname:req.body.fullname,
            email:req.body.emailid,
            password:hashpasswd,
            dob:req.body.dob,
            gender:req.body.gender,
            mobileno:req.body.mobileno ,
         };
         console.log(user);
        const newuser = new User(user);//for schemas validating 
        const result = await newuser.save();


        console.log('data saved successfully in databse');

        return res.status(200).json({ msg: 'signup successfull' })

    } catch (error) {

        console.log("error ocuurs while saving the signup data in database", error);
        return res.status(500).json({ msg: "error while sighup" });

    }

}




export const loginuser = async (req: Request, res: Response) => {
    //await function because database function 
    let user = await User.findOne({ email: req.body.email })
    // console.log(user);
    if (!user) {
        res.status(400).json({ msg: "Email Id not found" })
    }

    else {
        try {
            let match = await bcrypt.compare(req.body.password, user.password)
            // console.log(match)
            if (match) {
                
                // console.log(result);
                    res.status(200).json({ msg: "login successfully"})
                } 

        //if password does not  match then condition else run
            else {
                res.status(400).json({ msg: "password does not match" })
            }
        }
        catch (error) {
            
            res.status(500).json({ msg: "login failed ? try again" })

        }
    }
}
import express, { Router,  Response } from "express";
import { IUser,  IRequest } from "../../../types.js";
import User from "../../models/User.js";
import { PasswordUtils } from "../../utils/util.js";

const authRoutes:Router = express.Router();

// SignUp Login Logout Verify

// SignUp
authRoutes.post( "/signup", async ( req: IRequest, res: Response ) => {

    var signUpDets:IUser = req.body as IUser;
    if ( signUpDets.userName == "" || signUpDets.password == "" || signUpDets.email == "" ) {
        res.status(422).send( {ok: false, msg: "Credentials missing" } );
        return;
    }

    try {
        const existingUsers: IUser[] = await User.find({ userName: signUpDets.userName });
        
        if ( existingUsers.length != 0 ) {
            res.status(409).send( { ok: false, msg: "Username already exists"});
            return;
        }

    } catch ( err ) {
        res.status(500).send( {ok:false, msg:"Internal Server Error", err: err} );
        return;
    }

    const passFromFe:string = signUpDets.password;
    signUpDets.password = PasswordUtils.HashPassword(passFromFe);

    const newUser = new User(signUpDets);
    await newUser.save();

    res.status(200).send({ ok:true, msg: "Signed up successfully"});
    return;

})

// Login
authRoutes.post( "/login", async ( req: IRequest, res: Response ) => {
    // console.log(req.sessionID);

    var loginDets:IUser = req.body as IUser;
    // console.log(loginDets);
    
    if ( loginDets.userName == "" || loginDets.password == ""  ) {
        res.status(422).send( {ok: false, msg: "Credentials missing" } );
        return;
    }

    let existingUsers:IUser[];
    try {
        existingUsers = await User.find({ userName: loginDets.userName });
        
        if ( existingUsers.length != 1 ) {
            res.status(409).send( { ok: false, msg: "Username does not exists"});
            return;
        }
        const passFromFe:string = loginDets.password;
        const passFromBe:string = existingUsers[0].password;

        // console.log(passFromFe+" "+passFromBe);
        

        if ( PasswordUtils.CheckPassword(passFromFe, passFromBe) ){


            const respUserObject:any = existingUsers[0];

            req.session.user = {
                userName: respUserObject.userName, 
                email: respUserObject.email,
            }


            res.status(200).send( { ok:true, msg:"Login Successful", data: {

                userName: respUserObject.userName,
                email: respUserObject.email,
                firstName: respUserObject.firstName,
                middleName: respUserObject.middleName,
                lastName: respUserObject.lastName,
                dateOfBirth: respUserObject.dateOfBirth,
                gender: respUserObject.gender,
                phoneNumber: respUserObject.phoneNumber,

            } });
            return;

        } else {

            res.status(401).send( {ok:false, msg:"Login Unsuccessful. Wrong Password" });
            return;

        }

    } catch ( err ) {
        res.status(500).send( {ok:false, msg:"Internal Server Error", err: err} );
        return;
    }


})


// Logout
authRoutes.delete('/logout', (req:IRequest, res:Response) => {
  if (req.session) {
    req.session.destroy((err:Error) => {
      if (err) {
        res.status(400).send({ ok:false, err:err, msg: 'Unable to log out' });
      } else {
        res.send( { ok: true,  msg:"Logged out successfully"} );
      }
    });
  } else {
    res.end()
  }
})


// Verify
authRoutes.get("/verify", async(req:IRequest, res) => {

    if ( !req.session.user ) {
        res.status(401).send( { ok:false, msg: "No session cookie" });
    } else {
        res.status(200).send( { ok:true, msg: "Valid Session", } );
    }

})


export default authRoutes;

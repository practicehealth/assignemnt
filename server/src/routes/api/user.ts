import express, {  Request, Response } from 'express';
import Timeline from '../../models/Timeline.js';
import User from '../../models/User.js';

const userRoutes = express.Router();

// getData ( protected route )
userRoutes.get( "/user/profile",  async ( _:Request, res:Response) => {

    try {
        const timeLines = await Timeline.find({});
        res.status(200).send({ok:true, msg:"Successfully retrieved", data: timeLines});
    } catch ( err ) {
        res.status(500).send( {ok:false, msg: "Internal Server Error", err:err})
    }
})

// updateUser 
userRoutes.put( "/user/update", async ( req, res ) => {
    
    const userFromFe = req.body;
    if ( userFromFe.userName == "" ) {
        res.status(422).send( {ok: false, msg: "No username provided" } );
        return;
    }

    try {
        const existingUsers = await User.find({ userName: userFromFe.userName });
        if ( existingUsers == null ||  existingUsers.length != 1 ) {
            res.status(409).send( { ok: false, msg: "Username already exists"});
            return;
        }

        await User.updateOne( { userName: userFromFe.userName }, userFromFe );
        res.status(200).send( {ok:true, msg: "Updated the user successfully." });
    } catch ( err ) {
        res.status(500).send( { ok: false, msg: "Internal Server Error", err: err } )
    }
})


// forgotPassword


export default userRoutes;

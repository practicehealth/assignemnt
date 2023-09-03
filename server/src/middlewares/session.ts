import { Response, NextFunction } from 'express';
import { IRequest } from '../../types.js';

function ValidateSession( req:IRequest, res:Response, next:NextFunction ) {

    
    if ( !req.session.user ) {
        res.status(401).send( { "ok": false, "msg": "No session cookie found" } );
        return false;
    } else {
        next();
        return true;
    }

}

export default ValidateSession;

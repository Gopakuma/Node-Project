import config from 'config';
import { NextFunction } from 'express';
const serverConfig : any = config.get('server')
const privateKey : string  = serverConfig.privateKey;

import jwt from 'jsonwebtoken';


async function auth(req: any , res: any, next: NextFunction) {
    if(req.headers){
        try{
            var decoded : any = jwt.verify(req.headers.authorization, privateKey);
            console.log(decoded);
            //find user from db

            if(decoded) {
                console.log("decoded");
                next();
            } else {
                throw new Error('Invalid User');
            }
        } catch(e) {
            console.log(e);
            res.status(403).json({message: "Auth Failed"});
            throw new Error("Auth failed");
        }
    }
}

export default auth;
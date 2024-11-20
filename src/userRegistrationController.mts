import config from 'config';
const serverConfig : any = config.get('server');
const privateKey : string = serverConfig.privateKey;

import bcrypt from 'bcrypt';
const saltRounds = 10;

import jwt from 'jsonwebtoken';

type TUserDetails = {
    userName : string,
    hashedPassword : string
}

async function registerUser(req : any, res: any) {
    const body : any = req.body;
    const { userName , password } = body;

    const hashedPassword = await hashPassword(password);

    const userDetails : TUserDetails = {
        userName,
        hashedPassword
    }

    var token = jwt.sign(userDetails, privateKey);

    //save user

    res.status(200).json({"token": token})
}

async function hashPassword(password: string) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export default registerUser;
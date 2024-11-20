"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from 'config';
const serverConfig = config.get('server');
const privateKey = serverConfig.privateKey;
import bcrypt from 'bcrypt';
const saltRounds = 10;
import jwt from 'jsonwebtoken';
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = req.body;
        const { userName, password } = body;
        const hashedPassword = yield hashPassword(password);
        const userDetails = {
            userName,
            hashedPassword
        };
        var token = jwt.sign(userDetails, privateKey);
        //save user
        res.status(200).json({ "token": token });
    });
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield bcrypt.genSalt(saltRounds);
        const hash = yield bcrypt.hash(password, salt);
        return hash;
    });
}
export default registerUser;

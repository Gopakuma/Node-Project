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
import jwt from 'jsonwebtoken';
function auth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.headers) {
            try {
                var decoded = jwt.verify(req.headers.authorization, privateKey);
                console.log(decoded);
                //find user from db
                if (decoded) {
                    console.log("decoded");
                    next();
                }
                else {
                    throw new Error('Invalid User');
                }
            }
            catch (e) {
                console.log(e);
                res.status(403).json({ message: "Auth Failed" });
                throw new Error("Auth failed");
            }
        }
    });
}
export default auth;

import { Request, Response } from "express";
import { LoginUser } from "../../application/use-cases/loginUser";
import jwt, {SignOptions} from "jsonwebtoken";
import { Success, Error } from "../DTO/System";
import Logger from './../../lib/logger';

export function loginUser(req:Request, res:Response) {
    Logger.debug('loginUser Controller');
    const { email, password } = req.body;
    let loginUser = new LoginUser(email, password);
    let success: Success = { cod: 0, message: "N/A", payload: {} };
    let error: Error = { cod: 0, message: "N/A" };
    loginUser.authenticated()
            .then((result) => {
                if(result.authenticated){
                    let expiresIn = process.env.EXPIRATION_TIME_JWT || '24h';
                    let key_jwt = (process.env.SECRET_KEY_JWT || 'strongkey');
                    // @ts-ignore
                    let signOptions: SignOptions = { expiresIn };
                    let token = jwt.sign({user: result.userSaved}, key_jwt, signOptions);
                    success.cod = 200;
                    success.message = "success request";
                    success.payload = { jwt_token: 'Bearer '+  token };
                    res.status(200).send(success);
                } else {
                    error.cod = 401;
                    error.message = "email/password error";
                    res.status(401).send(error);
                }
            });
}
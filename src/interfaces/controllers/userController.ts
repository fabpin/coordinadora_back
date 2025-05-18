import { Request, Response } from "express";
import { LoginUser } from "../../application/use-cases/loginUser";
import { Success, Error } from "../DTO/System";
import Logger from './../../lib/logger';
import { CreateUser } from "../../application/use-cases/createUser";
import { sign, decrypt } from '../../shared/utils/JWT';
import { User } from "../../domain/entities/User";

function loginUser(req:Request, res:Response) {
    Logger.debug('loginUser userController');
    const { email, password } = req.body;
    let loginUser = new LoginUser(email, password);
    let success: Success = { cod: 0, message: "N/A", payload: {} };
    let error: Error = { cod: 0, message: "N/A" };
    loginUser.authenticated()
            .then((result) => {
                if(result.authenticated){
                    let token = sign(result.userSaved);
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

function createUser(req:Request, res:Response){
    Logger.debug('createUser userController');
    const { name, lastname,  id_number, email, password, identification_types_id } = req.body;
    let success: Success = { cod: 0, message: "N/A", payload: {} };
    let error: Error = { cod: 0, message: "N/A" };
    let user: User = { name, lastname, id_number, email, password, createdAt: 'N/A', identification_types_id };
    let createUser: CreateUser = new CreateUser(user);

    createUser.save()
            .then((userSaved) => {
                success.cod = 200;
                success.message = "success request";
                success.payload = createUser;
                res.status(200).send(userSaved);
            }).catch((error) => {
                Logger.error(error);
                error.cod = 500;
                error.message = "error of system";
                res.status(500).send(error);
            });
}

export {
    loginUser,
    createUser
}
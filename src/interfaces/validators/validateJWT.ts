import { Error } from "../DTO/System";
import { NextFunction, Request, Response } from "express";
import isJWT from 'validator/lib/isJWT';

export async function validateJWT(req:Request, res:Response, next:NextFunction) {
    let error: Error = { cod: 403, message: "N/A" };
    const { authorization } = req.headers;
    console.log('authorization: ', authorization);
    if(authorization){
        if(isJWT(authorization.split(" ")[1])) {
            next();
        } else {
            if(!isJWT(authorization.split(" ")[1])){
                error.message = "authorization incorrect!" 
            }

            res.status(403).send(error);
        }
    } else {
        if(!authorization){
            error.message = "authorization is required!" 
        }

        res.status(403).send(error);
    }
}
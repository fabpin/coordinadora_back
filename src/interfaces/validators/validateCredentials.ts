import { Error } from "../DTO/System";
import { NextFunction, Request, Response } from "express";
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';

export async function validationCredentials(req:Request, res:Response, next:NextFunction){
    const { email, password } = req.body;
    let error: Error = { cod: 403, message: "N/A" };
    let parametersRegex = /('|--|;|\/\*|\*\/|xp_|exec|union|select|insert|delete|drop|update|alter|create)/i;
    if(!isEmpty(email) && !isEmpty(password)){
        if(isEmail(email) && !matches(password, parametersRegex)){
            next();
        } else {
            if(!isEmail(email)){
                error.message = "Email incorrect!"    
            }
            
            if(matches(password, parametersRegex)){
                error.message = "Password incorrect! dont allow XXS tokens" 
            }

            res.status(403).send(error);
        }
    } else {
        if(isEmpty(email)){
            error.message = "Email incorrect!, must exist in the request"    
        }
        
        if(isEmpty(password)){
            error.message = "Password incorrect!, must exist in the request" 
        }
        
        res.status(403).send(error);
    }
}
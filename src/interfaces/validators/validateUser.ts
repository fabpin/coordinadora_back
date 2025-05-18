import { Error } from "../DTO/System";
import { NextFunction, Request, Response } from "express";
import isEmail from 'validator/lib/isEmail';
import isAlpha from 'validator/lib/isAlpha';
import isInt from 'validator/lib/isInt';
import isStrongPassword from 'validator/lib/isStrongPassword';
import isEmpty from 'validator/lib/isEmpty';
import matches from 'validator/lib/matches';

export async function validateUser(req:Request, res:Response, next:NextFunction){
    let error: Error = { cod: 403, message: "N/A" };
    let parametersRegex = /('|--|;|\/\*|\*\/|xp_|exec|union|select|insert|delete|drop|update|alter|create)/i;
    const { name, lastname,  id_number, email, password, identification_types_id } = req.body;
    if(
        !isEmpty(name) && 
        !isEmpty(lastname) && 
        !isEmpty(id_number.toString()) && 
        !isEmpty(email) && 
        !isEmpty(password) && 
        !isEmpty(identification_types_id.toString())
    ){
        if(
            isAlpha(name, "es-ES") && 
            isAlpha(lastname, "es-ES") &&  
            isInt(id_number.toString()) &&
            isEmail(email) &&
            isStrongPassword(password) &&
            isInt(identification_types_id.toString()) &&
            !matches(password, parametersRegex)
        ){
            next();
        } else {
            if(!isAlpha(name, "es-ES")){
                error.message = "name incorrect!"    
            }

            if(!isAlpha(lastname, "es-ES")){
                error.message = "lastname incorrect!"    
            }

            if(!isInt(id_number.toString())){
                error.message = "id_number incorrect!"    
            }

            if(!isInt(identification_types_id.toString())){
                error.message = "identification_types_id incorrect!"    
            }

            if(!isEmail(email)){
                error.message = "Email incorrect!"    
            }
            
            if(matches(password, parametersRegex)){
                error.message = "Password incorrect! dont allow XXS tokens" 
            }

            if(isStrongPassword(password)){
                error.message = "Password incorrect! need more secure!" 
            }

            res.status(403).send(error);
        }
    } else {
        if(isEmpty(name)){
            error.message = "name incorrect!, must exist in the request"    
        }

        if(isEmpty(lastname)){
            error.message = "lastname incorrect!, must exist in the request"    
        }

        if(isEmpty(id_number.toString())){
            error.message = "lastname incorrect!, must exist in the request"    
        }

        if(isEmpty(identification_types_id.toString())){
            error.message = "lastname incorrect!, must exist in the request"    
        }

        if(isEmpty(email)){
            error.message = "Email incorrect!, must exist in the request"    
        }
        
        if(isEmpty(password)){
            error.message = "Password incorrect!, must exist in the request" 
        }
        
        res.status(403).send(error);
    }
}
import jwt, {SignOptions, DecodeOptions} from "jsonwebtoken";
import { User } from "../../domain/entities/User";

function decrypt(jwtString: string): User{
    let jwtStringTemp = jwtString.split(' ')[1];
    let key_jwt = (process.env.SECRET_KEY_JWT || 'strongkey');
    let object = jwt.verify(jwtStringTemp, key_jwt);
    // @ts-ignore
    const { user } = object; 
    return user;
}

function sign(user: User){
    let expiresIn = process.env.EXPIRATION_TIME_JWT || '24h';
    let key_jwt = (process.env.SECRET_KEY_JWT || 'strongkey');
    // @ts-ignore
    let signOptions: SignOptions = { expiresIn };
    return jwt.sign({user}, key_jwt, signOptions);
}

export {
    decrypt,
    sign
}
import { User } from "../../domain/entities/User";
import { IAuthenticated } from "../interface/IAuthenticated";
import bcrypt  from "bcrypt";
import { UserReposity } from "../../infrastructure/database/repositories/mysql/UserRepository";
import Logger from './../../lib/logger';

export class LoginUser {
    private user: User = { 
        name: 'N/A', 
        lastname: 'N/A', 
        id_number: 'N/A', 
        email: 'N/A', 
        password: 'N/A',
        createdAt: 'N/A', 
        identification_types_id: 0
    };

    private userReposity: UserReposity;
    constructor(email: string, password: string){
        this.user.email = email;
        this.user.password = password;
        this.userReposity = new UserReposity();
    }

    async authenticated():Promise <IAuthenticated> {
        Logger.debug('authenticated user-cases');
        const userSaved:User = await this.userReposity.getUserByEmail(this.user.email);
        return {authenticated: bcrypt.compareSync(this.user.password, userSaved.password), userSaved};
    }
}
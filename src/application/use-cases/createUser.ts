import { IUser } from "../../infrastructure/database/models/mysql/IUser";
import { User } from "../../domain/entities/User";
import bcrypt  from "bcrypt";
import { UserReposity } from "../../infrastructure/database/repositories/mysql/UserRepository";
import Logger from './../../lib/logger';

export class CreateUser{
    private iuser: IUser;
    private userReposity: UserReposity;
    constructor(user: User){
        this.iuser = {...user};
        let saltTemp = process.env.SALTORROUNDS ? parseInt(process.env.SALTORROUNDS): 10;
        this.iuser.password = bcrypt.hashSync(this.iuser.password, saltTemp);
        this.userReposity = new UserReposity();
    }

    getIUserMySql(): IUser{
        Logger.debug("getIUserMySql CreateUser");
        return this.iuser;
    }

    async save(): Promise<User>{
        Logger.debug("save CreateUser");
        try {
            const saved = await this.userReposity.createUser(this.iuser);
            // @ts-ignore
            const userSaved: User = await this.userReposity.getUserById(saved['insertId']);
            return userSaved;
        } catch (error) {
            Logger.error(error);
            throw new Error('Error saved a new user!');
        }
    }
}
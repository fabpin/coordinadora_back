import { IUser } from "../../infrastructure/database/models/mysql/IUser";
import { User } from "../../domain/entities/User";
import bcrypt  from "bcrypt";
import { UserReposity } from "../../infrastructure/database/repositories/mysql/UserRepository";

export class CreateUser{
    private iuser: IUser;
    private userReposity: UserReposity;
    constructor(user: User){
        this.iuser = {...user};
        this.iuser.password = bcrypt.hashSync(this.iuser.password, process.env.SALTORROUNDS || 10);
        this.userReposity = new UserReposity();
    }

    getIUserMySql(): IUser{
        return this.iuser;
    }

    async save(){
        const saved = await this.userReposity.createUser(this.iuser);
        return saved;
    }
}
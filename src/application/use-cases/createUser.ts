import { IUser } from "../../infrastructure/database/models/mysql/IUser";
import { User } from "../interface/User";

export class CreateUser{
    private iuser: IUser;
    constructor(user: User){
        this.iuser = {...user}
    }

    
}
import { IUser } from "../../models/mysql/IUser";
import { connectionMySql } from "../../mysqlConf";
import Logger from "../../../../lib/logger";

export class UserReposity {
    constructor(){}

    async getUserById(id: number){
        return connectionMySql.query("SELECT * FROM users WHERE id = ?", [id])
                                .then((result) => {
                                    return result[0];
                                });
    }

    async getUserByEmail(email: string) {
        return connectionMySql.query("SELECT * FROM users WHERE email = ?", [email])
                                .then((result) => {
                                    return result[0];
                                });
    }

    async createUser(user: IUser){
     return connectionMySql.query(`INSERT INTO users (
        'id', 
        'name', 
        'lastname', 
        'id_number', 
        'email', 
        'password', 
        'createdAt', 
        'updatedAt', 
        'deletedAt', 
        'identification_types_id') 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,[
            null, 
            user.name, 
            user.lastname, 
            user.id_number, 
            user.email, 
            user.password, 
            new Date().toISOString(), 
            null,
            null, 
            user.identification_types_id
        ]).then((result) => {
            const [row] = result;
            return row;
        }).catch((error) => {
            Logger.error(error);
            throw new Error(error);
        }); 
    }
}
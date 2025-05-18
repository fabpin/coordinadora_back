import { IUser } from "../../models/mysql/IUser";
import { connectionMySql } from "../../mysqlConf";
import Logger from "../../../../lib/logger";
import { format } from 'date-fns';

export class UserReposity {
    async getUserById(id: number) {
        Logger.debug('getUserById UserRepository');
        await connectionMySql
        const [rows] = await connectionMySql.query("SELECT * FROM users WHERE id = ?", [id]);
        // @ts-ignore
        let iUser: IUser = rows[0];
        return iUser;
    }

    async getUserByEmail(email: string) {
        Logger.debug('getUserByEmail UserRepository');
        try {
            const [rows] = await connectionMySql.query('SELECT * FROM coordinadora.users WHERE email = ?', [email]);
            // @ts-ignore
            let iUser: IUser = rows[0];
            return iUser;
        } catch (error) {
            Logger.error(error);
            throw new Error('Error extracting user by email');
        }
    }

    async createUser(user: IUser) {
        Logger.debug('createUser UserRepository');
        try {
            const [rows] = await connectionMySql.query(`
                INSERT INTO users (
                    id, 
                    name, 
                    lastname, 
                    id_number, 
                    email, 
                    password, 
                    createdAt, 
                    updatedAt, 
                    deletedAt, 
                    identification_types_id
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`, [
                    null,
                    user.name,
                    user.lastname,
                    user.id_number,
                    user.email,
                    user.password,
                    format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
                    null,
                    null,
                    user.identification_types_id
                ]
            );
            return rows;
        } catch (error) {
            Logger.error(error);
            throw new Error('error creating user');
        }
    }
}
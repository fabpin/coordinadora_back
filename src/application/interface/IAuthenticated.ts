import { User } from "../../domain/entities/User"

export interface IAuthenticated {
    authenticated: boolean,
    userSaved: User
}
import { BaseDatabase } from "./BaseDatabase"

export class UserDatabase extends BaseDatabase {

    private static TABLE_NAME = "USER_FULLSTACK"
 
    async create(id: string, name: string, email: string, password: string, nickname: string){

        try {
            await this.getConnection()
        .insert({
            id,
            name,
            email,
            password,
            nickname
        }).into(UserDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error (error.sqlMessage || error.message)
        }
        
    }
}
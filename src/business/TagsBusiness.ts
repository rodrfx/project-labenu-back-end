import { TagsDatabase } from "../data/TagsDatabase";
import { CustomError } from "../errors/CustomError";
import { tag } from "../model/Tag";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";

export class TagsBusiness {

    async create(name: string, token: string): Promise<void> {

        try {
            if(!name){
                throw new Error("Nome inválido, preencha o campo.");
            }

            const idGenerator = new IdGenerator();
            const id = idGenerator.generate();

            const tokenManager = new TokenManager();
            const verifiedToken = tokenManager.get(token);

            if(!verifiedToken){
                throw new Error("Por favor, faça a autenticação");
            }  

            const tagsDatabase = new TagsDatabase();
            await tagsDatabase.create(id, name);

        } catch (error) {
            throw new CustomError(error.message, error.code);
        }
    }

    async get(token: string): Promise<tag[]>{

        try {

            const tokenManager = new TokenManager();
            const verifiedToken = tokenManager.get(token);

            if(!verifiedToken){
                throw new Error("Por favor, faça a autenticação");
            }

            const tagsDatabase = new TagsDatabase();
            const tags: tag[] = await tagsDatabase.get();
            return tags;
            
        } catch (error) {
            throw new CustomError(error.message, error.code);
        }
    }
}
import { BaseDatabase } from "./BaseDatabase";
import { DuplicateEntryError } from "../errors/DuplicateEntryError";
import { tag } from "../model/Tag";

export class TagsDatabase extends BaseDatabase {

    private static TABLE_NAME = "TAGS_FULLSTACK";

    async create(id: string, name: string) {

        try {
            await this.getConnection()
            .insert({id, name})
            .into(TagsDatabase.TABLE_NAME);

        } catch (error) {
            console.log(error);
            if(error.errno === 1062){
                throw new DuplicateEntryError();
            }
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async get(): Promise<tag[]> {

        try {

            const result = await this.getConnection()
            .select("*")
            .from(TagsDatabase.TABLE_NAME);

            const tags: tag[] = [];

            for(let tag of result){
                tags.push({id: tag.id, name: tag.name});
            }
            
            return tags;
            
        } catch (error) {
            throw new Error("Erro ao pesquisar por tags: "+error.sqlMessage);
        }
    }

}
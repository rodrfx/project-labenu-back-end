import { BaseDatabase } from "./BaseDatabase";
import { image } from "../model/Image"
import { DuplicateEntryError } from "../errors/DuplicateEntryError";
import { CustomError } from "../errors/CustomError";

export class ImageDatabase extends BaseDatabase{
    static get(): image[] | PromiseLike<image[]> {
        throw new Error("Method not implemented.");
    }
   
    private static TABLE_NAME = "IMAGE_FULLSTACK";
    private static INTER_TABLE_NAME = "IMAGE_TAGS_FULLSTACK";

    async create(image: image){
        try {

            await this.getConnection()
            .insert({
                id: image.id,
                subtitle: image.subtitle,
                author: image.author,
                date: image.date.toISOString().substring(0, 10),
                file: image.file,
                collection: image.collection
            })
            .into(ImageDatabase.TABLE_NAME);

            if (image.tags){
                for(let tag of image.tags){
                    await this.getConnection()
                    .insert({image_id: image.id, tags_id: tag.id})
                    .into(ImageDatabase.INTER_TABLE_NAME);
                }
            }
            
        } catch (error) {
            if(error.errno === 1062){
                throw new DuplicateEntryError();
            }
            throw new Error(error.sqlMessage || error.message);
        }
    }

    async get(): Promise<image[]>{
        try {

            const result = await this.getConnection()
            .select("*")
            .from(ImageDatabase.TABLE_NAME);

            const images: image[] = [];

            for(let image of result){
                images.push({
                    id: image.id,
                    subtitle: image.subtitle,
                    author: image.author,
                    date: image.date,
                    file: image.file,
                    collection: image.collection
                });       
            }

            return images;
            
        } catch (error) {
            throw new Error("Erro ao encontrar imagem: "+error.sqlMessage);
        }
    }

    async getImageById(id: string): Promise<image[]> {
        try {
           const result = await this.getConnection().raw(`
              SELECT * FROM ${ImageDatabase.TABLE_NAME}
              WHERE id = '${id}';
           `)

           return result[0][0];

        } catch (error) {
            throw new Error("Erro ao encontrar imagem.");
            
        }
     }
}


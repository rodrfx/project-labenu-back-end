import { ImageDatabase } from "../data/ImageDatabase";
import { CustomError } from "../errors/CustomError";
import { createImageInputDTO, image } from "../model/Image";
import { tag } from "../model/Tag";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/TokenManager";
import { TagsBusiness } from "./TagsBusiness";

export class ImageBusiness {

        async create(input: createImageInputDTO, token: string): Promise<void> {
    
            try {
    
                if (!input.subtitle || !input.file || !input.collection || input.tags.length < 1) {
                    throw new Error("Preencha todos os campos corretamente");
                }
    
                const tokenManager = new TokenManager()
                const verifiedToken = tokenManager.get(token);
                if (!verifiedToken) {
                    throw new Error("Logue novamente");
                }
    
                const tagsBusiness = new TagsBusiness();
                const existingTags = await tagsBusiness.get(token);
    
                const checkedTags = existingTags.filter((tags: tag) => {
                    return input.tags.includes(tags.name);
                });

                  if(checkedTags.length < 1){
                    for(let tag of input.tags){
                        await tagsBusiness.create(tag, token);
                    }
                 }
    
                const idGenerator = new IdGenerator();
                const id = idGenerator.generate();
    
                const image = {
                    id,
                    subtitle: input.subtitle,
                    author: input.author,
                    file: input.file,
                    tags: checkedTags,
                    collection: input.collection,
                    date: new Date()
                }
    
                const imageDatabase = new ImageDatabase();
                await imageDatabase.create(image);
    
            } catch (error) {
                throw new CustomError(error.message, error.code);
            }
        }

        async get(token: string): Promise<image[]> {

            const tokenManager = new TokenManager()
            const verifiedToken = tokenManager.get(token);
            if (!verifiedToken) {
                throw new Error("Chave inválida");
            }
    
            const imageDatabase = new  ImageDatabase();
            const images: image[] = await imageDatabase.get();
    
            return images;
        }

        async getImageById(id: string, token: string): Promise<image[]> {

            const tokenManager = new TokenManager()
            const verifiedToken = tokenManager.get(token);
            if (!verifiedToken) {
                throw new Error("Chave inválida");
            }
    
            const imageDatabase = new ImageDatabase();
            const image: image[] = await imageDatabase.getImageById(id);
    
            return image;
        }
    }
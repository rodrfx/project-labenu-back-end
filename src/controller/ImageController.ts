import { Request, Response } from "express";
import { createImageInputDTO } from "../model/Image";
import { ImageBusiness } from "../business/ImageBusiness";

export class ImageController {

    async create(req: Request, res: Response){
        try {

            const token = req.headers.authorization!;

            const input: createImageInputDTO = {
                subtitle: req.body.subtitle,
                author: req.body.author,
                file: req.body.file,
                tags: req.body.tags,
                collection: req.body.collection,
                date: req.body.date
            }

            const imageBusiness = new ImageBusiness();
            await imageBusiness.create(input, token);
            res.status(200).send({message: "Imagem cadastrada com sucesso"});
            
        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
    }

    async get(req: Request, res: Response){
        try {

            const token = req.headers.authorization!;
            const imageBusiness =  new ImageBusiness();
            const images = await imageBusiness.get(token);

            res.status(200).send({images});
            
        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
    }

    async getImageById(req: Request, res: Response){
        try {

            const id = req.params.id as string;
            const token = req.headers.authorization!;
            const imageBusiness =  new ImageBusiness();
            const imageId = await imageBusiness.getImageById(id, token);

            res.status(200).send({imageId});
            
        } catch (error) {
            res.status(error.code || 400).send({message: error.message});
        }
    }
}
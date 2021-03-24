import { Request, Response } from "express";
import { TagsBusiness } from "../business/TagsBusiness";

export class TagsController {

   async create(req: Request, res: Response){

       try {

        const name = req.body.name;
        const token = req.headers.authorization!;

        const tagsBusiness = new TagsBusiness();
        await tagsBusiness.create(name, token);
        res.status(200).send({message: "Tag criada com sucesso"});
           
       } catch (error) {
          res.status(error.code || 400).send({ message: error.message }); 
       }

    }

    async get(req: Request, res: Response){
        try {

            const token = req.headers.authorization!;
            const tagsBusiness = new TagsBusiness();
            const tags = await tagsBusiness.get(token);

            res.status(200).send({tags});
            
        } catch (error) {
            res.status(error.code || 400).send({ message: error.message }); 
        }
    }

}
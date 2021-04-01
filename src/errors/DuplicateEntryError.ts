import { CustomError } from "./CustomError";

export class DuplicateEntryError extends CustomError{
    constructor(){
        super("Valor duplicado", 406);
    }
}
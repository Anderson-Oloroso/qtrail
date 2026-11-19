import { AppError } from "../utils/app-error.js";

export class ErrorHandler{
    handle(error, req, res, next){
        console.error(error);

        const statusCode = error instanceof AppError ? error.statusCode : 500;

        const body = {
            error: {
                message:
                    error instanceof AppError ? error.message : 'Error interno del servidor',
                code: error instanceof AppError ? error.code : 'INTERNAL_ERROR'
            },
        }

        if(process.env.NODE_ENV !== 'production'){
            body.error.stack = error.stack;
        }

        return res.status(statusCode).json(body);
    };
}
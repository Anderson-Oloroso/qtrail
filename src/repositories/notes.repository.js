import { AppError } from "../utils/app-error.js";

export class NotesRepository {
    constructor( qClient, collection ){
        this.qdrant = qClient;
        this.collection = collection;
    }

    async findAll(limit = 100){
        try{
            const response = await this.qdrant.scroll(this.collection, {
                limit,
                with_payload: true,
                with_vector: false
            });
            return response.points;
        }catch(err){
            throw new AppError(`[REPOSITORY:QDRANT] Error al listar puntos de la colección: ${err.message}`, 500, 'QDRANT_SCROLL_ERROR');
        }
    }

    async createPoint( id, vector, payload){
        try{
            await this.qdrant.upsert(this.collection, {
                wait: true,
                points: [
                    {
                        id,
                        vector,
                        payload
                    }
                ]
            });
            console.log(`¡Punto ${this.collection} creado exitosamente!`);
        }catch( err ){
           throw new AppError(`[REPOSITORY:QDRANT] Error al guardar punto en la colección: ${err.message}`, 500, 'QDRANT_UPSERT_ERROR');
        }
    }

    async searchById( id ){
        try{
            const result = await this.qdrant.retrieve(this.collection, {
                ids: [ id ],
                with_payload: true,
                with_vector: false
            });
            console.log('Punto encontrado: ', result);
            return result;
        }catch(err){
            throw new AppError(`[REPOSITORY:QDRANT] Error al buscar punto por ID (${id}): ${err.message}`, 500, 'QDRANT_RETRIEVE_ERROR');
        }
    }

    async updatePayload( id, payload ){
        try{
            await this.qdrant.setPayload( this.collection, {
                wait: true,
                points: [ id ],
                payload
            });
            console.log(`Payload del punto con id ${id}, actualizado correctamente en la colección ${this.collection}`);
        }catch(err){
            throw new AppError(`[REPOSITORY:QDRANT] Error al actualizar payload del punto (${id}): ${err.message}`, 500, 'QDRANT_SET_PAYLOAD_ERROR');
        }
    }

    async deletePoint( id ){
        try{
            await this.qdrant.delete(this.collection, {
                wait: true,
                points: [ id ]
            })
        }catch(err){
            throw new AppError(`[REPOSITORY:QDRANT] Error al eliminar punto (${id}): ${err.message}`, 500, 'QDRANT_DELETE_ERROR');
        }
    }
}
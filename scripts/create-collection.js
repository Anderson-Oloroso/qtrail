import { AppError } from "../src/utils/app-error.js";
import { QDRANT_COLLECTION, qdrantClient } from "../src/config/qdrant.js";
class Colection {
    static async createCollection( name ){
        try{
            const { collections } = await qdrantClient.getCollections();
            const exists = collections.some( c => c.name === name );
            if(!exists){
                await qdrantClient.createCollection( name, {
                    vectors: {
                        size: 3072,
                        distance: "Cosine"
                    }
                })
                console.log(`¡Colección ${name} creada exitosamente!`);
            }else{
                console.log(`Ya existe una colección con nombre ${name}.`)
            }
        }catch(err){
            throw new AppError(`Ha ocurrido un error: ${err.message}`, 500)
        }
    }
}

await Colection.createCollection(QDRANT_COLLECTION);
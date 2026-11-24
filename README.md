# QTrail - Notas y Búsqueda Semántica con Qdrant

## Objetivo

Aplicación web y API REST para la gestión de notas personales con capacidades de búsqueda semántica y filtrado por palabras clave. El sistema aprovecha embeddings vectoriales generados mediante Google Gemini y almacenamiento persistente en la base de datos vectorial Qdrant.

## Tecnologías

- Node.js & Express 5: Arquitectura backend por capas (rutas, controladores, servicios y repositorios) con manejo centralizado de errores.
- Google Gemini: Generación de embeddings vectoriales mediante la librería `@google/genai` con el modelo `gemini-embedding-001`.
- Qdrant: Base de datos vectorial utilizada a través de `@qdrant/js-client-rest` para almacenamiento de puntos, búsqueda por similitud y filtrado por índice de payload (`keywords`).
- Frontend: HTML5 semántico, CSS3 moderno con variables y soporte para cambio de tema (modo claro y modo noche), y JavaScript vanilla modular (ES Modules).

## Árbol de Directorios

```text
qtrail/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js
│   │   └── app.js
│   └── index.html
├── scripts/
│   └── create-collection.js
├── src/
│   ├── config/
│   │   ├── env.js
│   │   ├── gemini.js
│   │   └── qdrant.js
│   ├── controllers/
│   │   └── notes.controller.js
│   ├── middleware/
│   │   └── error-handler.js
│   ├── repositories/
│   │   └── notes.repository.js
│   ├── routes/
│   │   └── notes.route.js
│   ├── services/
│   │   ├── embedding.service.js
│   │   └── notes.service.js
│   ├── utils/
│   │   └── app-error.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## Endpoints de la API

- `POST /api/notes`: Crea una nota, genera su embedding vectorial con Gemini y la indexa en Qdrant junto con sus palabras clave.
- `GET /api/notes`: Lista todas las notas almacenadas en la colección.
- `POST /api/notes/search`: Filtra notas coincidentes por palabras clave en Qdrant utilizando el índice de payload `keywords`.
- `DELETE /api/notes/:id`: Elimina una nota por su identificador UUID en Qdrant.
- `GET /health`: Endpoint para comprobar el estado y disponibilidad del servicio.

## Cómo Ejecutarlo

1. Clonar el repositorio e instalar las dependencias:
   ```bash
   npm install
   ```
2. Configurar las variables de entorno:
   Crear un archivo `.env` basado en `.env.example` y definir las claves requeridas:
   ```env
   NODE_ENV=development
   PORT=3300
   GEMINI_API_KEY=tu_api_key_de_gemini
   QDRANT_URL=tu_url_de_qdrant
   QDRANT_API_KEY=tu_api_key_de_qdrant
   QDRANT_COLLECTION=qtrail
   ```
3. Crear la colección e índice en Qdrant:
   ```bash
   npm run setup:qdrant
   ```
4. Iniciar el servidor:
   - Modo desarrollo (con recarga automática):
     ```bash
     npm run dev
     ```
   - Modo producción:
     ```bash
     npm start
     ```
5. Abrir la aplicación en el navegador:
   ```text
   http://localhost:3300
   ```

## Creador

- Henrik (Anderson-Oloroso) - [GitHub](https://github.com/Anderson-Oloroso)

const API_BASE_URL = ""; // Ej. "https://tu-backend.onrender.com" si está en otro dominio

async function requestJson(url, options = {}) {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = `Error HTTP ${response.status}`;
    try {
      const errorBody = await response.json();
      const message = errorBody?.error?.message || errorBody?.message;
      if (message) {
        errorMessage = message;
      }
    } catch {
      // Si la respuesta de error no es JSON válido, conservamos el mensaje por defecto
    }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function fetchNotes() {
  return requestJson("/api/notes");
}

export function createNote(payload) {
  return requestJson("/api/notes", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteNote(id) {
  return requestJson(`/api/notes/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function searchNotes(query) {
  return requestJson("/api/notes/search", {
    method: "POST",
    body: JSON.stringify({ query }),
  });
}
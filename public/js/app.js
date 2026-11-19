import { createNote, deleteNote, fetchNotes, searchNotes } from "./api.js";

const THEME_STORAGE_KEY = "qhuella-theme";

const themeToggleBtn = document.getElementById("theme-toggle");
const noteForm = document.getElementById("note-form");
const noteTextInput = document.getElementById("note-text");
const noteKeywordsInput = document.getElementById("note-keywords");
const searchForm = document.getElementById("search-form");
const searchQueryInput = document.getElementById("search-query");
const resetSearchBtn = document.getElementById("reset-search-btn");
const notesListEl = document.getElementById("notes-list");
const statusMessageEl = document.getElementById("status-message");

function syncThemeToggleUI(theme) {
  const isDark = theme === "dark";
  const iconEl = themeToggleBtn.querySelector(".theme-toggle__icon");
  const labelEl = themeToggleBtn.querySelector(".theme-toggle__label");

  themeToggleBtn.setAttribute("aria-pressed", String(isDark));
  if (iconEl) iconEl.textContent = isDark ? "☀️" : "🌙";
  if (labelEl) labelEl.textContent = isDark ? "Modo día" : "Modo noche";
}

function initThemeToggle() {
  const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  syncThemeToggleUI(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    const activeTheme = document.documentElement.getAttribute("data-theme") || "light";
    const nextTheme = activeTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    syncThemeToggleUI(nextTheme);
  });
}

function parseKeywords(rawValue) {
  return rawValue
    .split(",")
    .map((kw) => kw.trim())
    .filter(Boolean);
}

function renderNotes(notes, emptyText = "No hay notas guardadas todavía.") {
  notesListEl.innerHTML = "";

  if (!Array.isArray(notes) || notes.length === 0) {
    const emptyEl = document.createElement("p");
    emptyEl.className = "status-message";
    emptyEl.textContent = emptyText;
    notesListEl.appendChild(emptyEl);
    return;
  }

  for (const note of notes) {
    const item = document.createElement("article");
    item.className = "note-item";

    const topRow = document.createElement("div");
    topRow.className = "note-item__top";

    const textEl = document.createElement("p");
    textEl.className = "note-item__text";
    textEl.textContent = note.text ?? "";

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.className = "btn btn--danger";
    deleteBtn.textContent = "Eliminar";
    deleteBtn.addEventListener("click", async () => {
      try {
        statusMessageEl.textContent = "Eliminando nota...";
        await deleteNote(note.id);
        await loadAllNotes();
        statusMessageEl.textContent = "Nota eliminada.";
      } catch (err) {
        statusMessageEl.textContent = err.message;
      }
    });

    topRow.append(textEl, deleteBtn);

    const metaRow = document.createElement("div");
    metaRow.className = "note-item__meta";

    const keywords = Array.isArray(note.keywords) ? note.keywords : [];
    for (const kw of keywords) {
      const tag = document.createElement("span");
      tag.className = "keyword-tag";
      tag.textContent = kw;
      metaRow.appendChild(tag);
    }

    if (typeof note.score === "number") {
      const scoreEl = document.createElement("span");
      scoreEl.textContent = `Similitud: ${note.score.toFixed(3)}`;
      metaRow.appendChild(scoreEl);
    }

    if (note.createdAt) {
      const dateEl = document.createElement("time");
      dateEl.dateTime = note.createdAt;
      dateEl.textContent = new Date(note.createdAt).toLocaleString();
      metaRow.appendChild(dateEl);
    }

    item.append(topRow, metaRow);
    notesListEl.appendChild(item);
  }
}

async function loadAllNotes() {
  try {
    statusMessageEl.textContent = "Cargando notas...";
    const data = await fetchNotes();
    const notes = Array.isArray(data) ? data : data.notes || [];
    renderNotes(notes);
    statusMessageEl.textContent = `${notes.length} nota(s)`;
  } catch (err) {
    statusMessageEl.textContent = `No se pudieron cargar las notas: ${err.message}`;
  }
}

noteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const text = noteTextInput.value.trim();
  const keywords = parseKeywords(noteKeywordsInput.value);

  if (!text) return;

  try {
    statusMessageEl.textContent = "Guardando nota y generando embedding...";
    await createNote({ text, keywords });
    noteForm.reset();
    await loadAllNotes();
    statusMessageEl.textContent = "Nota guardada.";
  } catch (err) {
    statusMessageEl.textContent = `Error al guardar: ${err.message}`;
  }
});

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchQueryInput.value.trim();
  if (!query) return;

  try {
    statusMessageEl.textContent = "Buscando por similitud semántica...";
    const data = await searchNotes(query);
    const results = Array.isArray(data) ? data : data.results || data.notes || [];
    renderNotes(results, "No se encontraron notas similares para esa consulta.");
    statusMessageEl.textContent = `${results.length} coincidencia(s)`;
  } catch (err) {
    statusMessageEl.textContent = `Error en la búsqueda: ${err.message}`;
  }
});

resetSearchBtn.addEventListener("click", async () => {
  searchForm.reset();
  await loadAllNotes();
});

initThemeToggle();
loadAllNotes();
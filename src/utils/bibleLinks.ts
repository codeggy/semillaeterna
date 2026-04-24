// =============================
// 📖 Utilidad para convertir referencias bíblicas a enlaces de Bible.com
// Autor: Degui Dev
// =============================

// 🌐 URL base para Bible.com (versión español)
export const BIBLE_COM_BASE_URL = 'https://www.bible.com/es/bible/';

// 🔢 Código de versión "149" = Reina-Valera 1960
export const BIBLE_COM_VERSION_CODE = '176';

// 📜 Versión textual (para mostrar en el enlace)
export const BIBLE_VERSION = 'RVR1960';

// 📚 Mapa de abreviaturas oficiales de Bible.com
export const bookAbbrevMap: Record<string, string> = {
  // Antiguo Testamento
  "Génesis": "GEN",
  "Éxodo": "EXO",
  "Levítico": "LEV",
  "Números": "NUM",
  "Deuteronomio": "DEU",
  "Josué": "JOS",
  "Jueces": "JDG",
  "Rut": "RUT",
  "1 Samuel": "1SA",
  "2 Samuel": "2SA",
  "1 Reyes": "1KI",
  "2 Reyes": "2KI",
  "1 Crónicas": "1CH",
  "2 Crónicas": "2CH",
  "Esdras": "EZR",
  "Nehemías": "NEH",
  "Ester": "EST",
  "Job": "JOB",
  "Salmos": "PSA",
  "Proverbios": "PRO",
  "Eclesiastés": "ECC",
  "Cantares": "SNG",
  "Isaías": "ISA",
  "Jeremías": "JER",
  "Lamentaciones": "LAM",
  "Ezequiel": "EZK",
  "Daniel": "DAN",
  "Oseas": "HOS",
  "Joel": "JOL",
  "Amós": "AMO",
  "Abdías": "OBA",
  "Jonás": "JON",
  "Miqueas": "MIC",
  "Nahúm": "NAM",
  "Habacuc": "HAB",
  "Sofonías": "ZEP",
  "Hageo": "HAG",
  "Zacarías": "ZEC",
  "Malaquías": "MAL",

  // Nuevo Testamento
  "Mateo": "MAT",
  "Marcos": "MRK",
  "Lucas": "LUK",
  "Juan": "JHN",
  "Hechos": "ACT",
  "Romanos": "ROM",
  "1 Corintios": "1CO",
  "2 Corintios": "2CO",
  "Gálatas": "GAL",
  "Efesios": "EPH",
  "Filipenses": "PHP",
  "Colosenses": "COL",
  "1 Tesalonicenses": "1TH",
  "2 Tesalonicenses": "2TH",
  "1 Timoteo": "1TI",
  "2 Timoteo": "2TI",
  "Tito": "TIT",
  "Filemón": "PHM",
  "Hebreos": "HEB",
  "Santiago": "JAS",
  "1 Pedro": "1PE",
  "2 Pedro": "2PE",
  "1 Juan": "1JN",
  "2 Juan": "2JN",
  "3 Juan": "3JN",
  "Judas": "JUD",
  "Apocalipsis": "REV",
};

// 📖 Patrón regex para detectar referencias bíblicas
export const BIBLE_REF_PATTERN = /([0-9]?\s*[A-ZÁÉÍÓÚa-záéíóúñÑ]+(?:\s+[A-ZÁÉÍÓÚa-záéíóúñÑ]+)*)\s+([0-9]+:[0-9]+(?:-[0-9]+)?)/;

// 📖 Patrón para listas markdown con referencias bíblicas
export const BIBLE_REF_LIST_PATTERN = /^(\s*-\s+)([0-9]?\s*[A-ZÁÉÍÓÚa-záéíóúñÑ]+(?:\s+[A-ZÁÉÍÓÚa-záéíóúñÑ]+)*\s+[0-9]+:[0-9]+(?:-[0-9]+)?)$/gm;

/**
 * Parsea una referencia bíblica y devuelve sus componentes
 */
export function parseBibleReference(reference: string): { bookName: string; chapterAndVerses: string } | null {
  const parts = reference.trim().split(/\s+/);
  if (parts.length < 2) return null;
  
  const bookName = parts.slice(0, -1).join(' ');
  const chapterAndVerses = parts.slice(-1)[0];
  
  return { bookName, chapterAndVerses };
}

/**
 * Genera la URL de Bible.com para una referencia bíblica
 */
export function getBibleComUrl(reference: string): string | null {
  const parsed = parseBibleReference(reference);
  if (!parsed) return null;
  
  const { bookName, chapterAndVerses } = parsed;
  const abbrev = bookAbbrevMap[bookName];
  
  if (!abbrev) {
    console.warn(`No se encontró abreviatura para: ${bookName}`);
    return null;
  }
  
  const formattedVerses = chapterAndVerses.replace(':', '.');
  return `${BIBLE_COM_BASE_URL}${BIBLE_COM_VERSION_CODE}/${abbrev}.${formattedVerses}`;
}

/**
 * Convierte referencias bíblicas en markdown a enlaces HTML
 * (Para usar en componentes como Markmap)
 */
export function addBibleLinksToMarkdown(md: string): string {
  return md.replace(BIBLE_REF_LIST_PATTERN, (match, prefix, reference) => {
    const url = getBibleComUrl(reference);
    if (!url) return match;
    return `${prefix}<a href="${url}" target="_blank">${reference}</a>`;
  });
}

/**
 * Detecta si un texto contiene una referencia bíblica válida
 */
export function isBibleReference(text: string): boolean {
  const parsed = parseBibleReference(text);
  if (!parsed) return false;
  return bookAbbrevMap[parsed.bookName] !== undefined;
}

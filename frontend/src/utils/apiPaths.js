// For Render (single Web Service) you want SAME-ORIGIN requests in production.
// Set `VITE_API_URL` for local dev; if it's undefined, fall back to same-origin ("").
export const BASE_URL = import.meta.env.VITE_API_URL ?? "";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/auth/profile/:id",
  },
  BOOKS: {
    CREATE_BOOK: "/api/books",
    GET_BOOKS: "/api/books",
    GET_BOOK_BY_ID: "/api/books/:id",
    UPDATE_BOOK: "/api/books/:id",
    DELETE_BOOK: "/api/books/:id",
    UPDATE_COVER: "/api/books/cover/:id",
  },
  AI: {
    GENERATE_OUTLINE: "/api/ai/generate-outline",
    GENERATE_CHAPTER_CONTENT: "/api/ai/generate-chapter-content",
  },
  EXPORT: {
    PDF: "/api/export/:id/pdf",
    DOC: "/api/export/:id/doc",
  },
};

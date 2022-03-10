export const DB_CONSTANTS = {
  GUILD_DB: {
    TABLE: "guilds",
    ID: "id",
    GUILD_ID: "guild_id",
  },
  BOOKS: {
    TABLE: "books",
    ID: "id",
    GUILD_ID: "guild_id",
    TITLE: "title",
    SUGGESTION_TYPE: "SUGGESTION_TYPE"
  },
  PROMPTS: {
    TABLE: "prompts",
    ID: "id",
    GUILD_ID: "guild_id",
    PROMPT: "prompt" 
  }
};



export type BOOK_TYPES = "book" | "fanfic" | "meme";
export const BOOK_TYPE_ARGS: BOOK_TYPES[] = ["book", "fanfic", "meme"];
export type BOOK = {
    id: number;
    guild_id: string;
    title: string;
    suggestion_type: BOOK_TYPES;
}

export type PROMPT = {
    id: number;
    guild_id: string;
    prompt: string;
}
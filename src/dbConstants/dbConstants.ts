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
    BOOK_TYPE: "book_type"
  },
  PROMPTS: {
    TABLE: "prompts",
    ID: "id",
    GUILD_ID: "guild_id",
    USER_ID: "user_id", 
    PROMPT: "prompt", 
  },
  ELEVATED_USERS: {
    TABLE: 'elevated_users',
    ID: "id",
    GUILD_ID: 'guild_id',
    USER_ID: 'user_id',
  }
};

// https://www.postgresql.org/docs/current/errcodes-appendix.html
export const POSTGRES_ERROR_CODES = {
  UNIQUE_VIOLATION: '23505',
};

export type GUILD = {
    id: number,
    guild_id: string,
}

export type BOOK_TYPES = "book" | "fanfic" | "meme";
export const BOOK_TYPE_ARGS: BOOK_TYPES[] = ["book", "fanfic", "meme"];
export type BOOK = {
    id: number;
    guild_id: string;
    title: string;
    book_type: number;
}

export type PROMPT = {
    id: number;
    guild_id: string;
    prompt: string;
    user_id: string;
}

export type ELEVATED_USER = {
  guild_id: string;
  user_id: string;
}
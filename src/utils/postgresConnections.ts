import { CommandInteraction } from "discord.js";
import { Pool, PoolClient } from "pg";
import { BOOK, BOOK_TYPES, PROMPT as PROMPT_TYPE, DB_CONSTANTS } from "../dbConstants/dbConstants";
import { errorMessage } from "./errorMessage";

const convertTypeToSmallInt = (bookType: BOOK_TYPES) => {
  let type = 1;
  if(bookType ===  "fanfic"){
    type = 2;
  } else if(bookType === "meme"){
    type = 3;
  }

  return type;
};


const connectToClient = async () => {
  const {
    PGUSER,
    PGHOST,
    PGPORT,
    PGPASSWORD,
    PGDATABASE,
  } = process.env;

  const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    password: PGPASSWORD,
    port: parseInt(PGPORT),
    user: PGUSER
  });

   
  try {
    return await pool.connect();
  } catch(e) {
    console.error(e);
    console.error("Unable to connect to client");
  }
};


const getRandomBook = async (pool: PoolClient, guildId: string, bookType: BOOK_TYPES): Promise<BOOK[]> => {
  const {
    TABLE,
    GUILD_ID,
    SUGGESTION_TYPE
  } = DB_CONSTANTS.BOOKS;
    
  const books = await pool.query(`
        SELECT *
        FROM ${TABLE}
        WHERE ${SUGGESTION_TYPE} = $1 and (${GUILD_ID} = $2 or ${GUILD_ID} = NULL)
    `, [convertTypeToSmallInt(bookType), guildId]);

  return books.rows as BOOK[];
};

const addBook = async (pool: PoolClient, guildId: string, title: string, bookType: BOOK_TYPES) => {
    
  const {
    TABLE,
    TITLE,
    GUILD_ID,
    SUGGESTION_TYPE
  } = DB_CONSTANTS.BOOKS;
    
  const books = await pool.query(`
        INSERT INTO ${TABLE} (${GUILD_ID}, ${TITLE}, ${SUGGESTION_TYPE})
        VALUES ($1, $2, $3);
    `, [guildId, title, convertTypeToSmallInt(bookType)]);

  return books.rows as BOOK[];
};

const addSuggestion = async (pool: PoolClient, guildId: string, suggestion: string) => {
    
  const {
    TABLE,
    GUILD_ID,
    PROMPT
  } = DB_CONSTANTS.PROMPTS;
    
  const suggestions = await pool.query(`
        INSERT INTO ${TABLE} (${GUILD_ID}, ${PROMPT})
        VALUES ($1, $2);
    `, [guildId, suggestion]);

  return suggestions.rows as PROMPT_TYPE[];
};

const fetchSuggestion = async (pool: PoolClient, guildId: string) => {
  const {
    TABLE,
    GUILD_ID,
  } = DB_CONSTANTS.PROMPTS;
    
  const suggestions = await pool.query(`
        SELECT * from ${TABLE}
        WHERE ${GUILD_ID} = $1
        ORDER BY RANDOM()
    `, [guildId]);

  return suggestions.rows as PROMPT_TYPE[];
};

const deleteBook = async (pool: PoolClient, guildId: string, title: string, bookType: BOOK_TYPES) => {
  const {
    TABLE,
    TITLE,
    GUILD_ID,
    SUGGESTION_TYPE
  } = DB_CONSTANTS.BOOKS;
    
  const books = await pool.query<BOOK>(`
        DELETE FROM ${TABLE}
        WHERE ${GUILD_ID} = $1 and ${TITLE} = $2 and ${SUGGESTION_TYPE} = $3 as book_type
    `, [guildId, title, bookType]);

  return books;
};

const registerGuild = async (pool: PoolClient, guildId: string, interaction: CommandInteraction) => {
  const {
    TABLE,
    GUILD_ID,
  } = DB_CONSTANTS.GUILD_DB;

  try {
    const result = await pool.query(`
            INSERT INTO ${TABLE} (${GUILD_ID})
            VALUES ($1);
        `, [guildId]);

    if(result.rowCount !== 1){
      console.error({
        result,
        timestame: Date.now()
      });
      await errorMessage(pool, interaction, "Something went wrong!");  
    }
  } catch (e) {
    console.error({
      e,
      timestame: Date.now()
    });
    throw e;
  }

  return true;
    
};

export const DB_COMMANDS = {
  connectToClient,
  getRandomBook,
  addBook,
  deleteBook,
  registerGuild,
  addSuggestion,
  fetchSuggestion
};
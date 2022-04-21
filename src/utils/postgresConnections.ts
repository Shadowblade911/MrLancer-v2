import { CommandInteraction, Guild } from "discord.js";
import knex, { Knex } from "knex";
import { random } from "lodash";
import { Pool, PoolClient } from "pg";
import { BOOK, BOOK_TYPES, PROMPT as PROMPT_TYPE, DB_CONSTANTS, GUILD } from "../dbConstants/dbConstants";
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


const randomSelection = <T>(arr: Array<T>) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

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

const knexConnect = async () => {
  const {
    PGUSER,
    PGHOST,
    PGPORT,
    PGPASSWORD,
    PGDATABASE,
  } = process.env;

  const connection = await knex({
    client: 'pg',
    connection: {
      host : PGHOST,
      port : Number(PGPORT),
      user : PGUSER,
      password : PGPASSWORD,
      database : PGDATABASE,
    }
  });
  
  return connection;
};

const getRandomBookOfType = async (guildId, bookType: BOOK_TYPES): Promise<BOOK> => {
  const {
    TABLE,
    ID,
    GUILD_ID,
    BOOK_TYPE
  } = DB_CONSTANTS.BOOKS;
  
  const bookIds = await (await knexConnect())<BOOK>(TABLE)
    .select("id")
    .whereIn(GUILD_ID, [guildId, null])
    .andWhere(BOOK_TYPE, convertTypeToSmallInt(bookType));
 
    const { id } = randomSelection(bookIds);
  
    return (await knexConnect())<BOOK>(TABLE)
    .select("*")
    .where(ID, id)
    .first();
} 

const addBook = async(guildId: string, title: string, bookType: BOOK_TYPES) => {
  const {
    TABLE,
  } = DB_CONSTANTS.BOOKS;
    
  const books = await (await knexConnect())<BOOK>(TABLE)
  .insert({title: title, guild_id: guildId, book_type: convertTypeToSmallInt(bookType)})

  return books;
}

const getBook = async(guildId: string, id: number) => {
    const {
      TABLE,
      ID,
      GUILD_ID
    } = DB_CONSTANTS.BOOKS;
      
    const books = await (await knexConnect())<BOOK>(TABLE)
    .select("*")
    .where(ID, id)
    .andWhere(GUILD_ID, guildId)
    .first()
    
    return books;
  }

const addSuggestion = async (guildId:string, suggestion: string, userId: string) => {
    const {
        TABLE
    } = DB_CONSTANTS.PROMPTS;

    const prompt = (await knexConnect())<PROMPT_TYPE>(TABLE)
        .insert({guild_id: guildId, prompt: suggestion, user_id: userId});

    return prompt
}

const fetchSuggestion = async (guildId: string) => {
  const {
    TABLE,
    ID,
    GUILD_ID,
  } = DB_CONSTANTS.PROMPTS;
    
  const suggestionIds = await (await knexConnect())<PROMPT_TYPE>(TABLE)
    .select('id')
    .where(GUILD_ID, guildId)

  const { id } = randomSelection(suggestionIds);

  const suggestions = await (await knexConnect())<PROMPT_TYPE>(TABLE)
    .select("*")
    .where(ID, id);

  return suggestions;
};


const getSuggestion = async (guildId: string, id: number) => {
    const {
      TABLE,
      ID,
      GUILD_ID,
    } = DB_CONSTANTS.PROMPTS;
      
    const suggestions = await (await knexConnect())<PROMPT_TYPE>(TABLE)
      .select('*')
      .where(GUILD_ID, guildId)
      .andWhere(ID, id)
      .first();
  
    return suggestions;
  };

const deleteSuggestion = async (guildId: string, id: number) => {
    const {
        TABLE,
        GUILD_ID,
        ID,
    } = DB_CONSTANTS.PROMPTS;

    const suggestions = await (await knexConnect())<PROMPT_TYPE>(TABLE)
    .where(GUILD_ID, guildId)
    .andWhere(ID, id)
    .del();

    return suggestions;
}

const editSuggestion = async (guildId: string, id: number, suggestion: string) => {
    const {
        TABLE,
        GUILD_ID,
        ID,
    } = DB_CONSTANTS.PROMPTS;

    const suggestions = await (await knexConnect())<PROMPT_TYPE>(TABLE)
    .where(GUILD_ID, guildId)
    .andWhere(ID, id)
    .update({prompt: suggestion});

    return suggestions;
}

const deleteBook = async (guildId: string, title: string, type: BOOK_TYPES) => {
  const {
    TABLE,
    TITLE,
    BOOK_TYPE,
    GUILD_ID,
  } = DB_CONSTANTS.BOOKS;
    
  const books = await (await knexConnect())<BOOK>(TABLE)
    .where(GUILD_ID, guildId)
    .andWhere(TITLE, title)
    .andWhere(BOOK_TYPE, convertTypeToSmallInt(type))
    .del();

  return books;
};

const registerGuild = async (guildId: string, interaction: CommandInteraction) => {
  const {
    TABLE,
  } = DB_CONSTANTS.GUILD_DB;

    const guilds = await (await knexConnect())<GUILD>(TABLE)
        .insert({guild_id: guildId});

    return guilds;

};


export const DB_COMMANDS = {
  addBook,
  getBook,
  getRandomBookOfType,
  addSuggestion,
  getSuggestion,
  deleteSuggestion,
  deleteBook,
  registerGuild,
  fetchSuggestion,
  editSuggestion
}
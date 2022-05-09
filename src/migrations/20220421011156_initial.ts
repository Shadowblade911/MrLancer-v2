import { Knex } from "knex";

// these are taken from when the original schema was migrated up
// They are not imported because if those files change these would as well.
const DB_CONSTANTS = {
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
    }
  };

  const BOOK_TYPES = {
      TABLE: 'book_types',
      VALUE: 'value_no',
      TYPE_NAME: 'type_name',
  }

  
  

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(DB_CONSTANTS.GUILD_DB.TABLE, function(table){
        table.increments();
        table.string(DB_CONSTANTS.GUILD_DB.GUILD_ID).unique();
    })

    await knex.schema.createTable(BOOK_TYPES.TABLE, function(table){
        table.smallint(BOOK_TYPES.VALUE).primary();
        table.string(BOOK_TYPES.TYPE_NAME);
    })  
    
    await knex(BOOK_TYPES.TABLE).insert([
        {[BOOK_TYPES.VALUE]: 1, [BOOK_TYPES.TYPE_NAME]: 'book'},
        {[BOOK_TYPES.VALUE]: 2, [BOOK_TYPES.TYPE_NAME]: 'fanfic'},
        {[BOOK_TYPES.VALUE]: 3, [BOOK_TYPES.TYPE_NAME]: 'meme'}
    ]);


    await knex.schema.createTable(DB_CONSTANTS.BOOKS.TABLE, function(table){
        table.increments();
        table.string(DB_CONSTANTS.BOOKS.GUILD_ID)
            .references(DB_CONSTANTS.GUILD_DB.GUILD_ID)
            .inTable(DB_CONSTANTS.GUILD_DB.TABLE);
        table.string(DB_CONSTANTS.BOOKS.TITLE).notNullable();
        table.smallint(DB_CONSTANTS.BOOKS.BOOK_TYPE).notNullable();
    })

    await knex.schema.createTable(DB_CONSTANTS.PROMPTS.TABLE, function(table){
        table.increments();
        table.string(DB_CONSTANTS.PROMPTS.GUILD_ID)
            .references(DB_CONSTANTS.GUILD_DB.GUILD_ID)
            .inTable(DB_CONSTANTS.GUILD_DB.TABLE).notNullable();
        table.string(DB_CONSTANTS.PROMPTS.USER_ID).notNullable();
        table.text(DB_CONSTANTS.PROMPTS.PROMPT).notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
  // can't go down from here. Hope I got it right the first time
}


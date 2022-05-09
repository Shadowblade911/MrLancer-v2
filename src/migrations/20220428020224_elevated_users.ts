import { Knex } from "knex";

const DB_CONSTANTS = {
    GUILD_DB: {
        TABLE: "guilds",
        ID: "id",
        GUILD_ID: "guild_id",
    },
    ELEVATED_USERS: {
        TABLE: 'elevated_users',
        ID: "id",
        GUILD_ID: 'guild_id',
        USER_ID: 'user_id',
    },
    PROMPTS: {
        TABLE: "prompts",
        ID: "id",
        GUILD_ID: "guild_id",
        USER_ID: "user_id", 
        PROMPT: "prompt", 
    },
};

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DB_CONSTANTS.PROMPTS.TABLE, function(table){
        table.string(DB_CONSTANTS.PROMPTS.USER_ID).nullable().alter();
    })
    
    await knex.schema.createTable(DB_CONSTANTS.ELEVATED_USERS.TABLE, function(table){
        table.increments();
        table.string(DB_CONSTANTS.ELEVATED_USERS.GUILD_ID)
            .references(DB_CONSTANTS.GUILD_DB.GUILD_ID)
            .inTable(DB_CONSTANTS.GUILD_DB.TABLE);
        table.string(DB_CONSTANTS.ELEVATED_USERS.USER_ID).notNullable();
        table.unique([
            DB_CONSTANTS.ELEVATED_USERS.USER_ID,
            DB_CONSTANTS.ELEVATED_USERS.GUILD_ID
        ]);
    })

}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable(DB_CONSTANTS.ELEVATED_USERS.TABLE);

    await knex.schema.alterTable(DB_CONSTANTS.PROMPTS.TABLE, function(table){
        table.string(DB_CONSTANTS.PROMPTS.USER_ID).notNullable().alter();
    })
}


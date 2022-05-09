import { Knex } from "knex";

const DB_CONSTANTS = {
    BOOKS: {
        TABLE: "books",
        ID: "id",
        GUILD_ID: "guild_id",
        TITLE: "title",
        BOOK_TYPE: "book_type",
        UNIQUE_BOOKS_INDEX_COLUMNS: ["guild_id", "title", "book_type"],
        UNIQUE_BOOKS_INDEX_NAME: "unique_books",
    },
};

export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DB_CONSTANTS.BOOKS.TABLE, table => {
        table.unique(
            DB_CONSTANTS.BOOKS.UNIQUE_BOOKS_INDEX_COLUMNS,
            {indexName: DB_CONSTANTS.BOOKS.UNIQUE_BOOKS_INDEX_NAME}
        );
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable(DB_CONSTANTS.BOOKS.TABLE, table => {
        table.dropUnique(
            DB_CONSTANTS.BOOKS.UNIQUE_BOOKS_INDEX_COLUMNS,
            DB_CONSTANTS.BOOKS.UNIQUE_BOOKS_INDEX_NAME
        );
    });
}


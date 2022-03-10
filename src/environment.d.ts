declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DISCORD_BOT_TOKEN: string;
            DISCORD_CLIENT_ID: string;
            TEST_GUILD_ID: string;
            PGUSER: string;
            PGHOST: string;
            PGPORT: string;
            PGPASSWORD: string;
            PGDATABASE: string;
        }
    }
}

export {};
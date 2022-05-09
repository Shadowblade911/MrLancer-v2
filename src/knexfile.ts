import type { Knex } from "knex";
import dotenv from 'dotenv';
import path from 'path';

switch(process.env.NODE_ENV){
  case 'local':
    dotenv.config({ path: path.resolve(__dirname,'.env.local')})
    break;
  case 'production':
    dotenv.config({ path: path.resolve(__dirname, '.env')})
    break;
  default: 
    throw Error("unable to determine ENV, pass in NODE_ENV before running the migrate commands");
}

const config: { [key: string]: Knex.Config } = {
  [process.env.NODE_ENV]: {
    client: "postgresql",
    connection: {
      database: process.env.PGDATABASE,
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      db: process.env.PGDATABASE,
      port: Number(process.env.PGPORT),
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
};

module.exports = config;

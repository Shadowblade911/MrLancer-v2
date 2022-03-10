import { CommandInteraction } from "discord.js";
import { PoolClient } from "pg";
import { BOOK } from "../dbConstants/dbConstants";
import { DB_COMMANDS } from "./postgresConnections";


export const errorMessage = async (pool: PoolClient | null, userInteraction: CommandInteraction, error: string) => {
  const check = Math.floor(Math.random() * 100);
  let books: BOOK[] = [];

  let clientPool = pool;
  if(clientPool === null){
    clientPool = await DB_COMMANDS.connectToClient();
  } 

  if(check === 0){
    books = await DB_COMMANDS.getRandomBook(clientPool, userInteraction.guildId,  "meme");
  } else if (check < 30){
    books = await DB_COMMANDS.getRandomBook(clientPool, userInteraction.guildId, "fanfic");
  } else {
    books = await DB_COMMANDS.getRandomBook(clientPool, userInteraction.guildId, "book");
  }

  const title = books.length ? books[Math.floor(Math.random() * books.length)].title : "Fire and Ice";

  userInteraction.reply(`${title}! ${error}`);

};
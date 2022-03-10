import { CommandInteraction } from "discord.js";
import { PoolClient } from "pg";
import { BOOK } from "../dbConstants/dbConstants";
import { KNEX } from "./postgresConnections";


export const errorMessage = async (userInteraction: CommandInteraction, error: string) => {
  const check = Math.floor(Math.random() * 100);
  let books: BOOK[] = [];

  if(check === 0){
    books = await KNEX.getBooksOfType(userInteraction.guildId,  "meme");
  } else if (check < 30){
    books = await KNEX.getBooksOfType(userInteraction.guildId,  "fanfic");
  } else {
    books = await KNEX.getBooksOfType(userInteraction.guildId,  "book");
  }

  const title = books.length ? books[Math.floor(Math.random() * books.length)].title : "Fire and Ice";

  userInteraction.reply(`${title}! ${error}`);

};
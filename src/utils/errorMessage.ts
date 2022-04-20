import { CommandInteraction } from "discord.js";
import { BOOK } from "../dbConstants/dbConstants";
import { DB_COMMANDS } from "./postgresConnections";


export const errorMessage = async (userInteraction: CommandInteraction, error: string) => {
  const check = Math.floor(Math.random() * 100);
  let book: BOOK;

  if(check === 0){
    book = await DB_COMMANDS.getRandomBookOfType(userInteraction.guildId,  "meme");
  } else if (check < 30){
    book = await DB_COMMANDS.getRandomBookOfType(userInteraction.guildId,  "fanfic");
  } else {
    book = await DB_COMMANDS.getRandomBookOfType(userInteraction.guildId,  "book");
  }
  console.log(book);
  const title = book ? book.title : "Just Fourteen";

  userInteraction.reply(`${title}! ${error}`);

};
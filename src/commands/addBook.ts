
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";
import { allowsEdit } from "../utils/allowsEdit";


export const addBook = async (interaction: CommandInteraction) => {
    if(!await allowsEdit(interaction)){
      await errorMessage(interaction, "You do not have permissions for this command!");
      return;  
    }

    const type = interaction.options.getString(addBook.OPTIONS.kind, true);

    if(!BOOK_TYPE_ARGS.includes(type as BOOK_TYPES)){
      await errorMessage(interaction, `I don't know how to handle a type of ${type} `);
      return;  
    }

    const title = interaction.options.getString(addBook.OPTIONS.title, true);
    if(!title){
      await errorMessage(interaction, "I need a title!");
      return;  
    }
      
    const bookAdded = await DB_COMMANDS.addBook(
      interaction.guildId, 
      title,
      type as BOOK_TYPES
    );

    if(bookAdded) {
      await interaction.reply(`I have added ${title} to my repitoire!`);
    } else {
      await errorMessage(interaction, "I've already got that book.");
    }
};


addBook.OPTIONS = {
  title: "title",
  kind: "kind"
};

addBook.COMMAND_NAME = "addbook";
addBook.COMMAND =  new SlashCommandBuilder()
  .setName(addBook.COMMAND_NAME)
  .setDescription("Add a book to the error message responses")
  .addStringOption(option => option
    .setName(addBook.OPTIONS.title)
    .setDescription("The book you wish to add to the bot list list")
    .setRequired(true)
  )
  .addStringOption(option => option
    .setName(addBook.OPTIONS.kind)
    .addChoices(
      {name: "book", 'value': 'book'},
      {name: "fanfic", 'value': 'fanfic'},
      {name: "meme", 'value': 'meme'}
    )
    .setDescription("What kind of literature is it?")
    .setRequired(true)
  );

import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";


export const deleteBook = async (interaction: CommandInteraction) => {
    if(!interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD)){
      await errorMessage(interaction, "You do not have permissions for this command!");
      return;  
    }

    const type = interaction.options.getString(deleteBook.OPTIONS.kind, true);

    if(!BOOK_TYPE_ARGS.includes(type as BOOK_TYPES)){
      await errorMessage(interaction, `I don't know how to handle a type of ${type} `);
      return;  
    }

    const title = interaction.options.getString(deleteBook.OPTIONS.title, true);
    if(!title){
      await errorMessage(interaction, "I need a title!");
      return;  
    }
      
    await DB_COMMANDS.deleteBook(
      interaction.guildId, 
      title,
      type as BOOK_TYPES
    );

    await interaction.reply(`I have removed ${title} from my repitoire!`);
  
};


deleteBook.OPTIONS = {
  title: "title",
  kind: "kind"
};

deleteBook.COMMAND_NAME = "deletebook";
deleteBook.COMMAND =  new SlashCommandBuilder()
  .setName(deleteBook.COMMAND_NAME)
  .setDescription("The title of the book to remove")
  .addStringOption(option => option
    .setName(deleteBook.OPTIONS.title)
    .setDescription("The book you wish to remove from the bot list list. This has to be an exact match.")
    .setRequired(true)
  )
  .addStringOption(option => option
    .setName(deleteBook.OPTIONS.kind)
    .addChoice("book", "book")
    .addChoice("fanfic", "fanfic")
    .addChoice("meme", "meme")
    .setDescription("What kind of literature is it?")
    .setRequired(true)
  );
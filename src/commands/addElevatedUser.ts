
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";
import { allowsEdit } from "../utils/allowsEdit";


export const addElevatedUser = async (interaction: CommandInteraction) => {
    if(!await allowsEdit(interaction)){
      await errorMessage(interaction, "You do not have permissions for this command!");
      return;  
    }

};

addElevatedUser.OPTIONS = {
  userId: "User"
}

addElevatedUser.COMMAND_NAME = "addmod";
addElevatedUser.COMMAND = new SlashCommandBuilder()
.setName(addElevatedUser.COMMAND_NAME)
.setDescription('Adds a user to the moderator list of the bots')
.addUserOption(option => option.setName('user')
  .setRequired(true)
  .setDescription('The user')
);
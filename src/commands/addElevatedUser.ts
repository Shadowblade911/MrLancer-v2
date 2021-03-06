
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

    const user = interaction.options.getUser(addElevatedUser.OPTIONS.user, true);

    try {
    	await DB_COMMANDS.registerElevatedMember(interaction.guildId, user.id, interaction);

      interaction.reply(`I have succesfully added an additional manager!`);
    } catch {
      errorMessage(interaction, 'Something went wrong!');
    }


};

addElevatedUser.OPTIONS = {
  user: "user"
}

addElevatedUser.COMMAND_NAME = "addmod";
addElevatedUser.COMMAND = new SlashCommandBuilder()
.setName(addElevatedUser.COMMAND_NAME)
.setDescription('Adds a user to the moderator list for this bot')
.addUserOption(option => option.setName(addElevatedUser.OPTIONS.user)
  .setRequired(true)
  .setDescription('The user')
);
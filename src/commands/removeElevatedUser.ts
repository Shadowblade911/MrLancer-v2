
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";
import { allowsEdit } from "../utils/allowsEdit";


export const removeElevatedUser = async (interaction: CommandInteraction) => {
    if(!await allowsEdit(interaction)){
      await errorMessage(interaction, "You do not have permissions for this command!");
      return;  
    }

    const user = interaction.options.getUser(removeElevatedUser.OPTIONS.userId, true);

    try {
    	const result = await DB_COMMANDS.revokeElevatedMember(interaction.guildId, user.id, interaction);

      if(result === 0){
        errorMessage(interaction, 'Something went wrong! Perhaps they were not moderator of my system?');
      }
      interaction.reply(`I have succesfully added an additional manager!`);
    } catch {
      errorMessage(interaction, 'Something went wrong!');
    }


};

removeElevatedUser.OPTIONS = {
  userId: "User"
}

removeElevatedUser.COMMAND_NAME = "removemod";
removeElevatedUser.COMMAND = new SlashCommandBuilder()
.setName(removeElevatedUser.COMMAND_NAME)
.setDescription('remove a user to the moderator list for this bot')
.addUserOption(option => option.setName('user')
  .setRequired(true)
  .setDescription('The user')
);
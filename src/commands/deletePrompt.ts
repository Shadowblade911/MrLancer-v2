
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";


export const deletePrompt = async (interaction: CommandInteraction) => {
    
    const memberId = interaction.member.user.id;

    const guildId = interaction.guildId;
    const id = interaction.options.getNumber(deletePrompt.OPTIONS.id, true);

    const prompt = await DB_COMMANDS.getSuggestion(guildId, id);

    if(!prompt) {
      await errorMessage(interaction, "That prompt does not exist.");
      return;
    }
  
    if(!interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD) && memberId !== prompt.user_id){
      await errorMessage(interaction, "You are not allowed to delete this prompt. Ask a mod or the original creator.");
      return;  
    }

    await DB_COMMANDS.deleteSuggestion(
      interaction.guildId, 
      id,
    );

    await interaction.reply(`I have removed the suggestion from the list.`);
  
};


deletePrompt.OPTIONS = {
  id: "id",
};

deletePrompt.COMMAND_NAME = "deleteprompt";
deletePrompt.COMMAND =  new SlashCommandBuilder()
  .setName(deletePrompt.COMMAND_NAME)
  .setDescription("Deletes a suggested prompt")
  .addNumberOption(option => option
    .setName(deletePrompt.OPTIONS.id)
    .setDescription("The prompt you wish to remove from the list")
    .setRequired(true)
  );
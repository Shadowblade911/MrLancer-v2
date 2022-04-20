
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { quote, SlashCommandBuilder } from "@discordjs/builders";
import { BOOK_TYPES, BOOK_TYPE_ARGS } from "../dbConstants/dbConstants";


export const editPrompt = async (interaction: CommandInteraction) => {
    
    const memberId = interaction.member.user.id;

    const guildId = interaction.guildId;
    const id = interaction.options.getNumber(editPrompt.OPTIONS.id, true);
    const suggestion = interaction.options.getString(editPrompt.OPTIONS.suggestion, true);

    const prompt = await DB_COMMANDS.getSuggestion(guildId, id);
  
    if(!interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD) && memberId !== prompt.user_id){
      await errorMessage(interaction, "You are not allowed to delete this prompt. Ask a mod or the original creator.");
      return;  
    }

    await DB_COMMANDS.editSuggestion(
      interaction.guildId, 
      id,
      suggestion
    );

    await interaction.reply(`I have updated the suggestion.\n\n${quote(suggestion)}`);
  
};


editPrompt.OPTIONS = {
  id: "id",
  suggestion: "suggestion",
};

editPrompt.COMMAND_NAME = "editprompt";
editPrompt.COMMAND =  new SlashCommandBuilder()
  .setName(editPrompt.COMMAND_NAME)
  .setDescription("Deletes a suggested prompt")
  .addNumberOption(option => option
    .setName(editPrompt.OPTIONS.id)
    .setDescription("The prompt you wish to remove from the list")
    .setRequired(true)
  )
  .addStringOption(option => option
    .setName(editPrompt.OPTIONS.suggestion)
    .setDescription("The updated suggestion")
    .setRequired(true)
  );
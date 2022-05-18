
import { CommandInteraction, Permissions } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { blockQuote, SlashCommandBuilder } from "@discordjs/builders";
import { renderPrompt } from "../utils/renderPrompt";


export const editPrompt = async (interaction: CommandInteraction) => {
    
    const memberId = interaction.member.user.id;

    const guildId = interaction.guildId;
    const id = interaction.options.getNumber(editPrompt.OPTIONS.id, true);
    const suggestion = interaction
      .options
      .getString(editPrompt.OPTIONS.suggestion, true)
      .split('\\n')
      .map(line => line.trim())
      .join('\n');

    const prompt = await DB_COMMANDS.getSuggestion(guildId, id);

    if(!prompt) {
      await errorMessage(interaction, "That prompt does not exist.");
      return;
    }
  
    if(!interaction.memberPermissions.has(Permissions.FLAGS.MANAGE_GUILD) && memberId !== prompt.user_id){
      await errorMessage(interaction, "You are not allowed to edit this prompt. Ask a mod or the original creator.");
      return;  
    }

    const edited = await DB_COMMANDS.editSuggestion(
      interaction.guildId, 
      id,
      suggestion
    );

    if(!edited || edited.length == 0){
      console.error('Error editing prompt', {edited});
      await errorMessage(interaction, "There was an issue editing your prompt");
    } else {
      await interaction.reply(`I have updated the suggestion.\n${renderPrompt(edited[0])}`);
    }
};


editPrompt.OPTIONS = {
  id: "id",
  suggestion: "suggestion",
};

editPrompt.COMMAND_NAME = "editprompt";
editPrompt.COMMAND =  new SlashCommandBuilder()
  .setName(editPrompt.COMMAND_NAME)
  .setDescription("Edits a suggested prompt")
  .addNumberOption(option => option
    .setName(editPrompt.OPTIONS.id)
    .setDescription("The prompt you wish to edit")
    .setRequired(true)
  )
  .addStringOption(option => option
    .setName(editPrompt.OPTIONS.suggestion)
    .setDescription("The updated suggestion. Use `\\n` for line breaks.")
    .setRequired(true)
  );
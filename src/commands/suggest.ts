
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { codeBlock, SlashCommandBuilder } from "@discordjs/builders";
import { renderPrompt } from "../utils/renderPrompt";


export const suggest = async (interaction: CommandInteraction) => {

    const suggestion = interaction
      .options
      .getString(suggest.OPTIONS.suggestion, true)
      .split('\\n')
      .map(line => line.trim())
      .join('\n');

    if(!suggestion){
      await errorMessage(interaction, "I need a suggestion!");
      return;  
    }
      
    const result = await DB_COMMANDS.addSuggestion( 
      interaction.guildId, 
      suggestion,
      interaction.member.user.id
    );

    await interaction.reply(`That's an excellent suggestion! I'll add it to the list\n${renderPrompt(result[0])}`);
  
};


suggest.OPTIONS = {
  suggestion: "suggestion",
};

suggest.COMMAND_NAME = "suggest";
suggest.COMMAND =  new SlashCommandBuilder()
  .setName(suggest.COMMAND_NAME)
  .setDescription("Add a suggestion to the prompt list.")
  .addStringOption(option => option
    .setName(suggest.OPTIONS.suggestion)
    .setDescription("The suggestion. Use `\\n` for line breaks.")
    .setRequired(true)
  );
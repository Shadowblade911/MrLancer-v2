
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";


export const suggest = async (interaction: CommandInteraction) => {

    const suggestion = interaction.options.getString(suggest.OPTIONS.suggestion, true)?.replace('\\n', '\n');
    if(!suggestion){
      await errorMessage(interaction, "I need a suggestion!");
      return;  
    }
      
    const result = await DB_COMMANDS.addSuggestion( 
      interaction.guildId, 
      suggestion,
      interaction.member.user.id
    );

    await interaction.reply(`> ${suggestion.replace('\n', '\n> ')}\n\nThat's an excellent suggestion! I'll add it to the list`);
  
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
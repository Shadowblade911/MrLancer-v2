
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, quote } from "@discordjs/builders";


export const suggest = async (interaction: CommandInteraction) => {

  const pool = await DB_COMMANDS.connectToClient();
  try {

    const suggestion = interaction.options.getString(suggest.OPTIONS.suggestion, true);
    if(!suggestion){
      await errorMessage(pool, interaction, "I need a suggestion!");
      return;  
    }
      
    await DB_COMMANDS.addSuggestion(
      pool, 
      interaction.guildId, 
      suggestion
    );

    await interaction.reply(`${quote(suggestion)} \n That's an excellent suggestion!`);
  } finally {
    pool.release();
  }
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
    .setDescription("Suggest a prompt.")
    .setRequired(true)
  );

import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, quote, } from "@discordjs/builders";


export const prompt = async (interaction: CommandInteraction) => {

  

  const pool = await DB_COMMANDS.connectToClient();
  try {
      
    const result = await DB_COMMANDS.fetchSuggestion(
      pool, 
      interaction.guildId, 
    );

    if(!result || result.length === 0){
      await errorMessage(pool, interaction, "I was unable to find any prompts! Try adding some!");
      return;
    }


    await interaction.reply(`May I suggest? \n ${quote(result[0].prompt)}`);
  } finally {
    pool.release();
  }
};


prompt.COMMAND_NAME = "prompt";
prompt.COMMAND =  new SlashCommandBuilder()
  .setName(prompt.COMMAND_NAME)
  .setDescription("Request a prompt!");
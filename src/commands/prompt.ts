
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, quote, inlineCode } from "@discordjs/builders";


export const prompt = async (interaction: CommandInteraction) => {
      
    const result = await DB_COMMANDS.fetchSuggestion( 
      interaction.guildId, 
    );

    if(!result || result.length === 0){
      await errorMessage(interaction, "I was unable to find any prompts! Try adding some!");
      return;
    }

    const {
        id, 
        prompt
    } = result[0];
    await interaction.reply(`May I suggest the following? \nSuggestion #${inlineCode(id.toString())}:\n\n${quote(prompt)}\nYou're welcome.`);
};


prompt.COMMAND_NAME = "prompt";
prompt.COMMAND =  new SlashCommandBuilder()
  .setName(prompt.COMMAND_NAME)
  .setDescription("Request a prompt!");
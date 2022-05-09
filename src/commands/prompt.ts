
import { CommandInteraction, Interaction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, quote, inlineCode, blockQuote } from "@discordjs/builders";


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
        user_id,
        prompt
    } = result[0];

    console.log("What...");
    
    await interaction.reply({
      content: `May I suggest the following by <@${user_id}>? \nSuggestion #${inlineCode(id.toString())}:\n\n${blockQuote(prompt)}`,
      options: {
        allowedMentions: { users: [] }
      }
    });
    
};


prompt.COMMAND_NAME = "prompt";
prompt.COMMAND =  new SlashCommandBuilder()
  .setName(prompt.COMMAND_NAME)
  .setDescription("Request a prompt!");
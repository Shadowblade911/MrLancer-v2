
import { CommandInteraction, Interaction, InteractionReplyOptions, TextChannel } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, quote, inlineCode, blockQuote } from "@discordjs/builders";
import { renderPrompt } from "../utils/renderPrompt";


export const prompt = async (interaction: CommandInteraction, followUp?: true) => {
      
    const result = await DB_COMMANDS.fetchSuggestion( 
      interaction.guildId, 
    );

    if(!result || result.length === 0){
      await errorMessage(interaction, "I was unable to find any prompts! Try adding some!");
      return;
    }

    const suggestion = result[0];
    const {
      user_id
    } = suggestion;

    const creditLine = user_id ? ` by <@${user_id}>` : '';
    
    const message = {
      content: `May I suggest the following${creditLine}?\n${renderPrompt(suggestion)}`,
      options: {
        allowedMentions: { users: [] }
      }
    };

    if(!followUp) {
      const reply: InteractionReplyOptions = {
        content: `May I suggest the following${creditLine}?\n${renderPrompt(suggestion)}`,
        allowedMentions: {
          users: []
        }
      };

      await interaction.reply(reply);
    } else {
      (await interaction.client.channels.fetch(interaction.channelId) as TextChannel).send(message)
    }
    
};


prompt.COMMAND_NAME = "prompt";
prompt.COMMAND =  new SlashCommandBuilder()
  .setName(prompt.COMMAND_NAME)
  .setDescription("Request a prompt!");
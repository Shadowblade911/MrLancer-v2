
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";

export const register = async (interaction: CommandInteraction) => {
  
    try {
        const registerSuccessful = await DB_COMMANDS.registerGuild(interaction.guildId);

        if(registerSuccessful) {
            await interaction.reply(`I have succesfully registered your server!`);
        } else {
            await errorMessage(interaction, 'This guild has already been registered.');
        }
    } catch {
        await errorMessage(interaction, 'Something went wrong!');
    }

};

register.COMMAND_NAME = "register";
register.COMMAND =  new SlashCommandBuilder().setName(register.COMMAND_NAME).setDescription("Registers your server with Lancer's DB");
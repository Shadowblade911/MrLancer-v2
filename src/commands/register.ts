
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";

export const register = async (interaction: CommandInteraction) => {
  const pool = await DB_COMMANDS.connectToClient();
  try {
    await DB_COMMANDS.registerGuild(pool, interaction.guildId, interaction);
  } catch(e) {
    console.log(e); 
    await errorMessage(pool, interaction, "Something went wrong registering your server!");
    return;
  } finally {
    pool.release();
  }
};

register.COMMAND_NAME = "register";
register.COMMAND =  new SlashCommandBuilder().setName(register.COMMAND_NAME).setDescription("Registers your server with Lancer's DB");
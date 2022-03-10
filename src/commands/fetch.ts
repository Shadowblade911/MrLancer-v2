
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";

export const fetch = async (interaction: CommandInteraction) => {
  const pool = await DB_COMMANDS.connectToClient();
  await errorMessage(pool, interaction, "Stop trying to make fetch happen!");
  pool.release();
};

fetch.COMMAND_NAME = "fetch";
fetch.COMMAND =  new SlashCommandBuilder().setName(fetch.COMMAND_NAME).setDescription("Try to make fetch happen.");
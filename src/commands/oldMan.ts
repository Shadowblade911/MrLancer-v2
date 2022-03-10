
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder } from "@discordjs/builders";

export const oldMan = async (interaction: CommandInteraction) => {
  const pool = await DB_COMMANDS.connectToClient();
  await errorMessage(pool, interaction, "Who are you calling *OLD* man?");
  pool.release();
};

oldMan.COMMAND_NAME = "oldman";
oldMan.COMMAND =  new SlashCommandBuilder().setName(oldMan.COMMAND_NAME).setDescription("Calls Mr. Lancer an old man.");
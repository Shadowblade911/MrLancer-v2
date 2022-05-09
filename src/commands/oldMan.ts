
import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { prompt } from './prompt';

export const oldMan = async (interaction: CommandInteraction) => {
  await errorMessage(interaction, "Who are you calling *OLD* man?");
  await wait(1000);
  await prompt(interaction, true);
  
};

oldMan.COMMAND_NAME = "oldman";
oldMan.SUB_COMMAND = 'prompt';

oldMan.COMMAND =  new SlashCommandBuilder().setName(oldMan.COMMAND_NAME).setDescription("Call Mr. Lancer an old man while asking for a prompt");


function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

import { CommandInteraction } from "discord.js";
import { errorMessage } from "../utils/errorMessage";
import { DB_COMMANDS } from "../utils/postgresConnections";
import { SlashCommandBuilder, SlashCommandSubcommandBuilder } from "@discordjs/builders";
import { prompt } from './prompt';

export const oldMan = async (interaction: CommandInteraction) => {
  await errorMessage(interaction, "Who are you calling *OLD* man?");

  if(interaction.options.getSubcommand() === oldMan.SUB_COMMAND){
    await prompt(interaction);
  }
};

oldMan.COMMAND_NAME = "oldman";
oldMan.SUB_COMMAND = 'prompt';

oldMan.COMMAND =  new SlashCommandBuilder().setName(oldMan.COMMAND_NAME).setDescription("Calls Mr. Lancer an old man.")
.addSubcommand(subcommand =>
  subcommand
    .setName(oldMan.SUB_COMMAND)
    .setDescription('Asks for a prompt')
);

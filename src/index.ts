import * as dotenv from "dotenv";
import {Client as DiscordClient, Intents } from "discord.js";
import { oldMan } from "./commands/oldMan";
import { fetch } from "./commands/fetch";
import { errorMessage } from "./utils/errorMessage";
import { DB_COMMANDS } from "./utils/postgresConnections";
import { register } from "./commands/register";
import { addBook } from "./commands/addBook";
import { prompt } from "./commands/prompt";
import { suggest } from "./commands/suggest";
import { deletePrompt } from "./commands/deletePrompt";
import { deleteBook } from "./commands/deleteBook";
import { editPrompt } from "./commands/editprompt";
import { addElevatedUser } from "./commands/addElevatedUser";
import { removeElevatedUser } from "./commands/removeElevatedUser";

dotenv.config({path:__dirname+"/.env"});

const intents = new Intents();
intents.add(Intents.FLAGS.GUILD_MESSAGES);

const client = new DiscordClient({
  intents
});

client.login(process.env.DISCORD_BOT_TOKEN);

client.once("ready", () => {
  console.log("Ready!!");
});

client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()){
    return;
  }
  const command = interaction.commandName;
  switch(command){
    case oldMan.COMMAND_NAME: {
      await oldMan(interaction);
      break;
    }
    case fetch.COMMAND_NAME: {
      await fetch(interaction);
      break;
    }
    case register.COMMAND_NAME: {
      await register(interaction);
      break;
    }
    case addBook.COMMAND_NAME: {
      await addBook(interaction);
      break;
    }
    case deleteBook.COMMAND_NAME: {
        await deleteBook(interaction);
        break;
    }
    case prompt.COMMAND_NAME: {
      await prompt(interaction);
      break;
    }
    case suggest.COMMAND_NAME: {
      await suggest(interaction);
      break;
    }
    case deletePrompt.COMMAND_NAME: {
        await deletePrompt(interaction);
        break;
    }
    case editPrompt.COMMAND_NAME: {
        await editPrompt(interaction);
        break;
    }
    case addElevatedUser.COMMAND_NAME: {
      await addElevatedUser(interaction);
      break;
    }
    case removeElevatedUser.COMMAND_NAME: {
      await removeElevatedUser(interaction);
      break;
    }
    default: {
      await errorMessage(interaction, `I failed to understand what you meant by ${command}`);
    }
  }

});

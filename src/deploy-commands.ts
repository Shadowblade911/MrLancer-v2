import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import * as dotenv from "dotenv";
import { oldMan } from "./commands/oldMan";
import { fetch } from "./commands/fetch";
import { register } from "./commands/register";
import { addBook } from "./commands/addBook";
import { suggest } from "./commands/suggest";
import { prompt } from "./commands/prompt";


const { parsed:env } = dotenv.config({path:__dirname+"/.env"});

console.log(env);

const commands = [
  oldMan.COMMAND,
  fetch.COMMAND,
  register.COMMAND,
  addBook.COMMAND,
  suggest.COMMAND,
  prompt.COMMAND,
];

const rest = new REST({version: "9"}).setToken(env.DISCORD_BOT_TOKEN);
const clientId = process.env.DISCORD_CLIENT_ID;

let apiCall;
if(env.TEST_GUILD_ID){
  console.log("Attempting to register commands in test enviornment");
  apiCall = Routes.applicationGuildCommands(clientId, env.TEST_GUILD_ID);
} else {
  console.log("Attempting to register commands globally");
  apiCall = Routes.applicationCommands(clientId);
}

rest.put(apiCall, {body: commands.map(command => command.toJSON())})
  .then(() => {
    if(env.TEST_GUILD_ID){
      console.log("Succesfully registered application commands to test enviornment");
    } else {
      console.log("Succesfully registered application commands globally");
    }
  })
  .catch(console.error);
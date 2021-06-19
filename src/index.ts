require("dotenv").config();

import { Client } from "discord.js";
import { cmdRaidHandler } from "./cmdRaidHandler";

const config = {
  prefix: "!",
};

const client = new Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("message", async (message) => {
  console.log("New message:", message.content);

  // Do not handle bot messages
  if (message.author.bot) return;

  // Do not handle messages that are not commands
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const preCheckCommand = args.shift();

  // Do not handle non commands - typescript safety
  if (!preCheckCommand) return;

  const command = preCheckCommand.toLowerCase();

  if (command === "ping") {
    message.channel.send("Pong!");
  } else if (command === "raid") {
    await cmdRaidHandler(message, args);
  }
});

client.login(process.env.BOT_TOKEN);

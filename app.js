const Discord = require("discord.js");
require("dotenv").config();

const config = {
  prefix: "!",
};

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));

client.on("message", (message) => {
  console.log("New message:", message.content);

  // Do not handle bot messages
  if (message.author.bot) return;

  // Do not handle messages that are not commands
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log("The created command is:", command);
  console.log("The args for the command are:", args);

  if (command === "ping") {
    message.channel.send("Pong!");
  } else if (command === "blah") {
    message.channel.send("Meh.");
  } else if (command === "raids") {
    if (args.length > 0) {
      // Try to create new raid
      message.channel.send(
        "Here you will need to add your raid infos in the future"
      );
    } else {
      // Display raids
      message.channel.send("YO BROTHA THERES NO RAIDS RIGHT NOW");
    }
  }
});

client.login(process.env.BOT_TOKEN);

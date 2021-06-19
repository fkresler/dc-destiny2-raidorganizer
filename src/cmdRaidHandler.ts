import { Message } from "discord.js";
import firebase from "./firebase";

export const cmdRaidHandler = async (message: Message, args: string[]) => {
  message.channel.send("WE GONNA DO SOME RAID STUFF NOW");

  if (!message.guild?.id) {
    message.channel.send(
      "Error: Could not figure out your guild id. Contact an administrator."
    );
    return;
  }

  if (args.length < 1) {
    message.channel.send(
      "Error: Could not figure out your command. Contact an administrator."
    );
    return;
  }

  const guildRaidsRef = firebase.raidEntries.doc(message.guild.id);
  const guildRaidsData = await guildRaidsRef.get();

  if (args.length === 1 || args[1] === "list" || args[1] === "next") {
    if (!guildRaidsData) {
      message.channel.send(
        "There are no upcoming events. Feel free to create some!"
      );
      return;
    }
  }
};

export default cmdRaidHandler;

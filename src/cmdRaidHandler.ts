import { Message } from "discord.js";
import firebase from "./firebase";
import { RaidEntry } from "./types";

export const printRaidEntry = async (message: Message, raid: RaidEntry) => {
  message.channel.send(`Raid ID: ${raid.id}`);
  message.channel.send(`Date: ${raid.date}`);
  message.channel.send(`Title: ${raid.title} - ${raid.description}`);
};

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
  const guildRaidsData = await (await guildRaidsRef.get()).data();

  if (args.length === 1 || args[1] === "list" || args[1] === "next") {
    if (!guildRaidsData) {
      message.channel.send(
        "There are no upcoming events. Feel free to create some!"
      );
      return;
    }
    for (
      let counter = 0;
      counter < 5 || counter < guildRaidsData.raidEntries.length;
      counter++
    ) {
      const currentRaidEntry = guildRaidsData.raidEntries[counter];
      printRaidEntry(message, currentRaidEntry);
    }
  }

  if (args[1] === "add") {
    const previousEntries = guildRaidsData
      ? [...guildRaidsData.raidEntries]
      : [];
    const newRaidEntry: RaidEntry = {
      id: new Date().toString(),
      author: message.author.id,
      date: new Date().toString(),
      title: "New Raid yey",
      description: "LW, GoS, DSC or VoG Pog",
      participants: [],
      isArchived: false,
    };
    const newRaidEntries = [...previousEntries, newRaidEntry];
    await guildRaidsRef.set({
      guildId: message.guild.id,
      lastChanged: new Date().toString(),
      raidEntries: newRaidEntries,
    });
    message.channel.send("Your raid was added:");
    printRaidEntry(message, newRaidEntry);
  }
};

export default cmdRaidHandler;

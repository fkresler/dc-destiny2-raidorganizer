import { Message, MessageEmbed } from "discord.js";
import firebase from "./firebase";
import { RaidEntry } from "./types";

export const printRaidEntry = (message: Message, raid: RaidEntry) => {
  const raidMessage = new MessageEmbed()
    .setTitle(`${raid.title} - ID: ${raid.id}`)
    .setDescription(`${raid.description}\n*Date*: ${raid.date}`)
    .setFooter(`Created by: ${raid.author}`);
  for (let counter = 1; counter <= raid.participants.length; counter++) {
    raidMessage.addField(`Participant #${counter}`, raid.participants[counter]);
  }
  message.channel.send(raidMessage);
};

export const cmdRaidHandler = async (message: Message, args: string[]) => {
  console.log("Raid Cmd Handler with args:", args);

  if (!message.guild?.id) {
    message.channel.send(
      "Error: Could not figure out your guild id. Contact an administrator."
    );
    return;
  }

  const guildRaidsRef = firebase.raidEntries.doc(message.guild.id);
  const guildRaidsData = await (await guildRaidsRef.get()).data();

  if (args.length === 0 || args[0] === "help") {
    const helpMessage = new MessageEmbed().setTitle("Commands").setDescription(`
      - !list or !next: get a listing of the next 5 upcoming events or raids\n
      - !add or !new: add a new event or raid\n
      - !remove or !delete: remove an event or raid\n
    `);
    message.channel.send(helpMessage);
  }

  if (args[0] === "list" || args[0] === "next") {
    if (!guildRaidsData) {
      message.channel.send(
        "There are no upcoming events or raids. Feel free to create some!"
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

  if (args[0] === "add" || args[0] === "new") {
    const previousEntries = guildRaidsData
      ? [...guildRaidsData.raidEntries]
      : [];
    const newRaidEntry: RaidEntry = {
      id: new Date().getUTCMilliseconds().toString(),
      author: message.author.username,
      date: "2021-08-20",
      title: "New Raid yey",
      description: "LW, GoS, DSC or VoG Pog",
      participants: ["IchKannNix", "ikx", "ikxie", "ikxienh0"],
      isArchived: false,
    };
    const newRaidEntries = [...previousEntries, newRaidEntry];
    await guildRaidsRef.set({
      guildId: message.guild.id,
      lastChanged: new Date().toLocaleDateString(),
      raidEntries: newRaidEntries,
    });
    message.channel.send("Your event or raid was added successfully:");
    printRaidEntry(message, newRaidEntry);
  }

  if (args[0] === "delete" || args[0] === "remove") {
    if (!args[1]) {
      message.channel.send(
        `I require the id of the event or raid to be deleted. Please use:\n!raid remove <id of the raid>`
      );
      return;
    }
    const previousEntries = guildRaidsData
      ? [...guildRaidsData.raidEntries]
      : [];
    const newRaidEntries = previousEntries.filter(
      (raid) => raid.id !== args[1]
    );
    await guildRaidsRef.set({
      guildId: message.guild.id,
      lastChanged: new Date().toString(),
      raidEntries: newRaidEntries,
    });
    message.channel.send(
      "All entries with your provided id were removed successfully!"
    );
  }
};

export default cmdRaidHandler;

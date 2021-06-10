import { Message } from "discord.js";
import firebase from "./firebase";

export const cmdRaidHandler = async (message: Message, args: string[]) => {
  message.channel.send("WE GONNA DO SOME RAID STUFF NOW");

  const db = firebase.firestore();

  if (message.guild?.id) {
    // TODO: for now just add example data every time
    const content = args.concat();
    const docRef = db.collection("servers").doc(message.guild.id);
    await docRef.set({
      guild: message.guild.id,
      raids: {
        content,
      },
    });
  }
};

export default cmdRaidHandler;

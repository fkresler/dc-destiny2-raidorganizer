export type GuildRaidData = {
  guildId: string;
  lastChanged: string;
  raidEntries: RaidEntry[];
};

export type RaidEntry = {
  id: string;
  author: string;
  date: string;
  title: string;
  description: string;
  participants: string[];
  isArchived: boolean;
};

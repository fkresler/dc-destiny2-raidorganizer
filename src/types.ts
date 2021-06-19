export type GuildRaidData = {
  guildId: string;
  lastChanged: string;
  raidEntries: RaidEntry[];
};

export type RaidEntry = {
  id: string;
  datetime: string;
  title: string;
  description: string;
  participants: string[];
  isArchived: boolean;
};

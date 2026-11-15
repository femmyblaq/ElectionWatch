export type ElectionStatus =
  | "UPCOMING"
  | "ONGOING"
  | "COMPLETED";

export type Election = {
  id: string;
  title: string;
  electionType: string;
  date: string;
  state: string;
  status: ElectionStatus;
  description: string;
};

import type { Election } from "@/types/elections";

// Illustrative records for frontend development.
// Replace with records returned by the Django API.

export const elections: Election[] = [
  {
    id: "election-2027-presidential",
    title: "2027 Presidential Election",
    electionType: "Presidential",
    date: "2027-01-16",
    state: "National",
    status: "UPCOMING",
    description:
      "The presidential election provides eligible Nigerian voters with the opportunity to elect the President and Commander-in-Chief of the Federal Republic of Nigeria.",
  },
  {
    id: "election-2027-senate",
    title: "2027 Senate Election",
    electionType: "Senate",
    date: "2027-01-16",
    state: "National",
    status: "UPCOMING",
    description:
      "The senatorial election allows eligible voters to elect representatives to the Senate of the National Assembly across Nigeria's senatorial districts.",
  },
  {
    id: "election-2027-house-representatives",
    title: "2027 House of Representatives Election",
    electionType: "House of Representatives",
    date: "2027-01-16",
    state: "National",
    status: "UPCOMING",
    description:
      "The election allows eligible voters to elect representatives to the Federal House of Representatives across Nigeria's federal constituencies.",
  },
];

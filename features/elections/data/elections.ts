import type { Election } from "@/types/elections";

// Illustrative records for frontend development only.
// Replace these with records returned by the Django API.
export const elections: Election[] = [
  {
    id: "demo-1",
    title: "Sample Governorship Election",
    electionType: "Governorship",
    date: "2027-03-15",
    state: "Lagos",
    status: "UPCOMING",
    description:
      "Illustrative election record used to develop the elections interface.",
  },
  {
    id: "demo-2",
    title: "Sample State Assembly Election",
    electionType: "State Assembly",
    date: "2027-02-20",
    state: "Oyo",
    status: "ONGOING",
    description:
      "Illustrative election record used to develop the elections interface.",
  },
  {
    id: "demo-3",
    title: "Sample Local Government Election",
    electionType: "Local Government",
    date: "2026-08-10",
    state: "Kano",
    status: "COMPLETED",
    description:
      "Illustrative election record used to develop the elections interface.",
  },
];
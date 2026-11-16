
export type AgentApplicationStatus =
  | "INCOMPLETE"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REQUIRES_CORRECTION"
  | "APPROVED"
  | "REJECTED";

export type AgentProfile = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  state: string;
  lga: string;
  ward: string;
  organization: string;
  membershipNumber: string;
};

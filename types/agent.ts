
export type AgentApplicationStatus =
  | "INCOMPLETE"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REQUIRES_CORRECTION"
  | "APPROVED"
  | "REJECTED";

export type AgentUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  role: "AGENT";
  applicationStatus: AgentApplicationStatus;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
};

export type AgentVerificationPayload = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  state: string;
  lga: string;
  ward: string;
  organization?: string;
  membershipNumber?: string;
  documents: {
    passport: File | null;
    votersCard: File | null;
    membershipCard: File | null;
    additionalId: File | null;
  };
  consent: boolean;
};

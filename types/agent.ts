
export type AgentApplicationStatus =
  | "INCOMPLETE"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REQUIRES_CORRECTION"
  | "APPROVED"
  | "REJECTED";

export type AgentReviewStatus =
  | "UNDER_REVIEW"
  | "APPROVED"
  | "REJECTED"
  | "REQUIRES_CORRECTION";

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

export type AgentApplication = {
  id: string;
  agentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  state: string;
  lga: string;
  ward: string;
  organization?: string;
  membershipNumber?: string;

  documents: {
    passport: string;
    votersCard: string;
    membershipCard?: string;
    additionalId?: string;
  };

  status: AgentReviewStatus;
  submittedAt: string;
  reviewedAt?: string;
  reviewNote?: string;
};


export type AssignmentStatus =
  | "ASSIGNED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type AgentAssignment = {
  id: string;
  agentId: string;
  agentName: string;

  pollingUnitCode: string;
  pollingUnitName: string;

  state: string;
  lga: string;
  ward: string;
  address: string;

  electionName: string;
  electionDate: string;

  status: AssignmentStatus;
  assignedAt: string;
};

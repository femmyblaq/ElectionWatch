
import type { AgentAssignment } from "@/types/assignment";

const STORAGE_KEY = "electionwatch_agent_assignments";

function readAssignments(): AgentAssignment[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as AgentAssignment[]) : [];
  } catch {
    return [];
  }
}

function saveAssignments(assignments: AgentAssignment[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assignments));
}

export async function getAgentAssignments(
  agentId: string
): Promise<AgentAssignment[]> {
  if (typeof window === "undefined") return [];

  return readAssignments().filter(
    (assignment) =>
      assignment.agentId === agentId &&
      assignment.status !== "CANCELLED"
  );
}

export async function getAllAssignments(): Promise<AgentAssignment[]> {
  if (typeof window === "undefined") return [];
  return readAssignments();
}

type CreateAssignmentPayload = Omit<
  AgentAssignment,
  "id" | "status" | "assignedAt"
>;

export async function createAgentAssignment(
  payload: CreateAssignmentPayload
): Promise<AgentAssignment> {
  if (typeof window === "undefined") {
    throw new Error("Assignments can only be created in the browser.");
  }

  const assignments = readAssignments();

  // Prevent assigning the same polling unit to the same agent twice.
  const duplicate = assignments.some(
    (assignment) =>
      assignment.agentId === payload.agentId &&
      assignment.pollingUnitCode.toLowerCase() ===
        payload.pollingUnitCode.toLowerCase() &&
      assignment.status !== "CANCELLED"
  );

  if (duplicate) {
    throw new Error(
      "This polling unit is already assigned to this agent."
    );
  }

  const assignment: AgentAssignment = {
    ...payload,
    id: `ASN-${crypto.randomUUID()}`,
    status: "ASSIGNED",
    assignedAt: new Date().toISOString(),
  };

  saveAssignments([...assignments, assignment]);

  return assignment;
}



import type {
  AgentApplication,
  AgentReviewStatus,
} from "../../../types/agent";



import {
  getCurrentAgent,
  updateCurrentAgent,
} from "./auth";

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const APPLICATION_STORAGE_KEY =
  "electionwatch_agent_applications";

// Retrieve all applications.
export async function getAgentApplications(): Promise<
  AgentApplication[]
> {
  if (!MOCK_API) {
    throw new Error(
      "Django admin applications API has not been connected yet."
    );
  }

  await new Promise((resolve) =>
    setTimeout(resolve, 400)
  );

  try {
    const stored = localStorage.getItem(
      APPLICATION_STORAGE_KEY
    );

    return stored ? JSON.parse(stored) : [];
  } catch {
    throw new Error(
      "Unable to read stored agent applications."
    );
  }
}

// Retrieve one application by ID.
export async function getAgentApplication(
  id: string
): Promise<AgentApplication | null> {
  const applications = await getAgentApplications();

  return (
    applications.find(
      (application) => application.id === id
    ) ?? null
  );
}

// Review an application.
export async function reviewAgentApplication(
  id: string,
  status: Exclude<AgentReviewStatus, "UNDER_REVIEW">,
  reviewNote?: string
): Promise<AgentApplication> {
  if (!MOCK_API) {
    throw new Error(
      "Django admin review API has not been connected yet."
    );
  }

  if (
    (status === "REJECTED" ||
      status === "REQUIRES_CORRECTION") &&
    !reviewNote?.trim()
  ) {
    throw new Error(
      "A review reason is required for this decision."
    );
  }

  const applications = await getAgentApplications();

  const applicationIndex = applications.findIndex(
    (application) => application.id === id
  );

  if (applicationIndex === -1) {
    throw new Error(
      "Agent application could not be found."
    );
  }

  const currentApplication =
    applications[applicationIndex];

  if (currentApplication.status !== "UNDER_REVIEW") {
    throw new Error(
      "This application has already been reviewed."
    );
  }

  // Update application.
  const updatedApplication: AgentApplication = {
    ...currentApplication,
    status,
    reviewNote: reviewNote?.trim(),
    reviewedAt: new Date().toISOString(),
  };

  applications[applicationIndex] = updatedApplication;

  // Save updated applications.
  localStorage.setItem(
    APPLICATION_STORAGE_KEY,
    JSON.stringify(applications)
  );

  // Update the agent only if this is the currently
  // stored demo agent being reviewed.
  const currentAgent = getCurrentAgent();

  if (currentAgent?.id === currentApplication.agentId) {
    updateCurrentAgent({
      applicationStatus: status,
    });
  }

  return updatedApplication;
}

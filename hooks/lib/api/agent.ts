
import type {
  AgentApplication,
  AgentVerificationPayload,
} from "@/types/agent";

import { updateCurrentAgent } from "./auth";

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const APPLICATION_STORAGE_KEY =
  "electionwatch_agent_applications";

export async function submitAgentVerification(
  payload: AgentVerificationPayload
): Promise<AgentApplication> {
  // 1. Validate required documents.
  if (!payload.documents.passport) {
    throw new Error("Passport photograph is required.");
  }

  if (!payload.documents.votersCard) {
    throw new Error("Voter's card is required.");
  }

  // 2. Validate consent.
  if (!payload.consent) {
    throw new Error("Please accept the verification consent.");
  }

  // 3. Mock API implementation.
  if (MOCK_API) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    // Update the current agent.
    const agent = updateCurrentAgent({
      fullName: payload.fullName,
      phoneNumber: payload.phoneNumber,
      applicationStatus: "UNDER_REVIEW",
    });

    if (!agent) {
      throw new Error(
        "Your demo session has expired. Please sign up again."
      );
    }

    // Create the application record.
    const application: AgentApplication = {
      id: `APP-${Date.now()}`,
      agentId: agent.id,

      fullName: payload.fullName,
      email: payload.email,
      phoneNumber: payload.phoneNumber,

      state: payload.state,
      lga: payload.lga,
      ward: payload.ward,

      organization: payload.organization,
      membershipNumber: payload.membershipNumber,

      // Demo mode stores filenames only.
      documents: {
        passport: payload.documents.passport.name,
        votersCard: payload.documents.votersCard.name,
        membershipCard:
          payload.documents.membershipCard?.name,
        additionalId:
          payload.documents.additionalId?.name,
      },

      status: "UNDER_REVIEW",
      submittedAt: new Date().toISOString(),
    };

    // Retrieve existing applications.
    const storedApplications = localStorage.getItem(
      APPLICATION_STORAGE_KEY
    );

    const applications: AgentApplication[] =
      storedApplications
        ? JSON.parse(storedApplications)
        : [];

    // Save the new application.
    applications.push(application);

    localStorage.setItem(
      APPLICATION_STORAGE_KEY,
      JSON.stringify(applications)
    );

    return application;
  }

  // 4. Real Django API integration.
  // Replace this section when your Django endpoint
  // and serializer contract are confirmed.

  throw new Error(
    "Django agent verification API has not been connected yet."
  );
}

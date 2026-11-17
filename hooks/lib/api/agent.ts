
import type { AgentVerificationPayload } from "@/types/agent";
import { updateCurrentAgent } from "./auth";

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function submitAgentVerification(
  payload: AgentVerificationPayload
) {
  if (!payload.documents.passport || !payload.documents.votersCard) {
    throw new Error("Passport photograph and voter's card are required.");
  }

  if (!payload.consent) {
    throw new Error("Verification consent is required.");
  }

  if (MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const agent = updateCurrentAgent({
      fullName: payload.fullName,
      phoneNumber: payload.phoneNumber,
      applicationStatus: "UNDER_REVIEW",
    });

    if (!agent) {
      throw new Error("Your demo session has expired. Please sign up again.");
    }

    // Demo only: do not store actual document files in browser storage.
    return agent;
  }

  const formData = new FormData();

  formData.append("full_name", payload.fullName);
  formData.append("email", payload.email);
  formData.append("phone_number", payload.phoneNumber);
  formData.append("date_of_birth", payload.dateOfBirth);
  formData.append("state", payload.state);
  formData.append("lga", payload.lga);
  formData.append("ward", payload.ward);
  formData.append("organization", payload.organization || "");
  formData.append("membership_number", payload.membershipNumber || "");
  formData.append("consent", String(payload.consent));

  Object.entries(payload.documents).forEach(([key, file]) => {
    if (file) {
      formData.append(key, file);
    }
  });

  // Placeholder: align this endpoint with your Django API.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents/verification/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail || data?.message || "Document submission failed."
    );
  }

  return data;
}

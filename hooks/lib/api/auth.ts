
import type { AgentUser, SignupPayload } from "@/types/agent";

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

const STORAGE_KEY = "electionwatch_demo_agent";

function saveDemoAgent(agent: AgentUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(agent));
}

export function getCurrentAgent(): AgentUser | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AgentUser;
  } catch {
    return null;
  }
}

export function updateCurrentAgent(
  updates: Partial<AgentUser>
): AgentUser | null {
  const current = getCurrentAgent();
  if (!current) return null;

  const updated = { ...current, ...updates };
  saveDemoAgent(updated);

  return updated;
}

export async function registerAgent(
  payload: SignupPayload
): Promise<AgentUser> {
  if (MOCK_API) {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const agent: AgentUser = {
      id: `DEMO-${Date.now()}`,
      fullName: payload.fullName,
      email: payload.email,
      role: "AGENT",
      applicationStatus: "INCOMPLETE",
    };

    saveDemoAgent(agent);

    return agent;
  }

  // Replace this with your actual Django registration endpoint.
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/register/`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.detail || data?.message || "Registration failed."
    );
  }

  return data as AgentUser;
}

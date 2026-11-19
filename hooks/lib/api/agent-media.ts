
type SubmitAgentVideoPayload = {
  file: File;
  description: string;
};

type SubmitAgentVideoResult = {
  message: string;
  id?: string;
};

const MOCK_API =
  process.env.NEXT_PUBLIC_USE_MOCK_API === "true";

export async function submitAgentVideo(
  payload: SubmitAgentVideoPayload
): Promise<SubmitAgentVideoResult> {
  if (!payload.file) {
    throw new Error("A video file is required.");
  }

  if (!payload.description.trim()) {
    throw new Error("A video description is required.");
  }

  if (MOCK_API) {
    // Simulates a server response.
    // The actual video bytes are NOT uploaded or saved.
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      id: `VIDEO-${Date.now()}`,
      message:
        "Demo submission successful. The video was previewed, but its contents were not uploaded to a server.",
    };
  }

  // Placeholder integration.
  // Confirm the actual Django endpoint and field names
  // before using this in production.
  const formData = new FormData();

  formData.append("video", payload.file);
  formData.append("description", payload.description);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/agents/videos/`,
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
      data?.detail ||
      data?.message ||
      "Unable to submit your video."
    );
  }

  return {
    id: data.id,
    message: "Your video has been submitted successfully.",
  };
}

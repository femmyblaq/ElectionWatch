const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RequestOptions = RequestInit;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API base URL is not configured.");
  }

  const isFormData = options.body instanceof FormData;

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(isFormData
          ? {}
          : options.body
            ? { "Content-Type": "application/json" }
            : {}),
        ...options.headers,
      },
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail ||
      error?.message ||
      `Request failed: ${response.status}`
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
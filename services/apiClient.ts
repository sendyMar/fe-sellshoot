const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface FetchOptions extends RequestInit {
  token?: string;
}

/**
 * Centralized API client for making requests to the BFF layer (app/api/).
 * Services call this client, which targets Next.js Route Handlers.
 * For direct Django calls (from Route Handlers), use `djangoFetch`.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(endpoint, {
    headers,
    ...restOptions,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Direct fetch to Django backend — used ONLY inside Next.js Route Handlers (BFF layer).
 * This should NOT be imported by client components or services.
 */
export async function djangoFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { token, headers: customHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...((customHeaders as Record<string, string>) || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${path}`;

  const response = await fetch(url, {
    headers,
    ...restOptions,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData?.message || `Django API Error: ${response.status}`
    );
  }

  return response.json();
}

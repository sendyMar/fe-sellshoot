import { useSession } from "next-auth/react";

interface CustomUser {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  avatar?: string;
  id?: number | string;
}

export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user as CustomUser | undefined,
    token: (session as any)?.accessToken as string | undefined,
    isLoading: status === "loading",
    isAuthenticated: status === "authenticated",
  };
}

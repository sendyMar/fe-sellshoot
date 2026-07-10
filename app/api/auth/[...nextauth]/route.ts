import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account && account.id_token) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id_token: account.id_token }),
          });

          const data = await res.json();
          
          if (res.ok && data.success) {
            token.accessToken = data.data.access;
            token.refreshToken = data.data.refresh;
            token.user = data.data.user;
          } else {
             console.error("Backend auth error:", data);
          }
        } catch (error) {
          console.error("Error connecting to backend during auth:", error);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user
        };
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };

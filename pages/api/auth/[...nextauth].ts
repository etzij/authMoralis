import NextAuth from 'next-auth';
import { MoralisNextAuthProvider } from '@moralisweb3/next';

export default NextAuth({
  providers: [MoralisNextAuthProvider()],
  callbacks: {
    async jwt({ token, user }: {token: any; user: any}) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }: {token: any; session: any}) {
      (session as { user: unknown }).user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/signin',
  },
});
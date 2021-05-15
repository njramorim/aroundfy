import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope:
        "user-read-email user-read-currently-playing user-read-recently-played",
    }),
  ],
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      return process.env.NEXT_PUBLIC_DOMAIN_URL;
    },
    async jwt(token, _, account) {
      if (account) {
        token.id = account.id;
        token.accessToken = account.accessToken;
      }

      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});

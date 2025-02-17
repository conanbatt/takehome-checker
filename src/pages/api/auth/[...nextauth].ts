import NextAuth, { AuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID!,
            clientSecret: process.env.GITHUB_SECRET!,
            authorization: {
                params: {
                    scope: 'repo user:email read:user',
                    redirect_uri: process.env.NEXTAUTH_URL!,
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                console.log("Github Account received: ", account);
                token.accessToken = account.access_token!;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session as unknown as { accessToken: string }).accessToken = token.accessToken as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: true,
};

export default NextAuth(authOptions);

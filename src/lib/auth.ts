import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/gitlab";
import { nanoid } from "nanoid";

export const authOptions: AuthOptions = {
    secret: process.env.JWT_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID as string,
            clientSecret: process.env.GOOGLE_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (!account || !profile) return false;

            return true; // Do different verification for other providers that don't have `email_verified`
        },
        async jwt({ token, user, account }) {
            // Add user ID to the token if user is present

            if (user) {
                token.id = user.id || nanoid(11); // Assuming you have user.id available
            }

            return token;
        },
        async session({ session, token, id }) {
            // Attach user ID to the session
            session.user.id = token.id; // Access user ID from token
            return session;
        },
    },
};

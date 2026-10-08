import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

// client only connects when a query runs, the fallback just keeps build happy
const client = new MongoClient(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017");
const db = client.db(process.env.MONGODB_DB || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // after sign up user goes to login page, so no auto login
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  // lets server actions / route handlers set the cookie
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;

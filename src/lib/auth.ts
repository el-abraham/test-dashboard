import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

// NOTE: The Google provider configuration here does not use environment variables (env)
// because this is just a simple example. In a real implementation, 
// sensitive information like ClientID and ClientSecret should be stored in an .env file
// or a secure secret manager.

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SCRET ?? "",
    }),
  ],
  secret: "secret",
  callbacks: {
    redirect: async ({ url, baseUrl }) => {
      return "/dashboard"
    }
  }
}

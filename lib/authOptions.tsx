import { type AuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "./mongoDB";
import User from "./models/User";
import bcrypt from 'bcryptjs'

export const authOptions: AuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: 'credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials: any) {
        await connectToDB()

        try {
          const user = await User.findOne({ email: credentials?.email })

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password, user.password
            )

            if (isPasswordCorrect) {
              return user
            }
          }
        } catch (error: any) {
          throw new Error(error)
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },

  pages: {
    signIn: "/auth/login",
  },
};

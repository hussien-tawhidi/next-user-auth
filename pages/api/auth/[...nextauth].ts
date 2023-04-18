import NextAuth,{NextAuthOptions} from "next-auth";
import CredentailsProvider from "next-auth/providers/credentials";
import { connectionToMongoDB } from "@/lib/mongodb";
import User from "@/model/User";
import { compare } from "bcryptjs";
import { IUser } from "@/types";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentailsProvider({
      id: "credentials",
      name: "credentails",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentails) {
        await connectionToMongoDB().catch((err) => {
          throw new Error(err);
        });

        const user = await User?.findOne({
          email: credentails?.email,
        }).select("+password");

        if (!user) {
          throw new Error("Invalid credentails");
        }

        const isPasswordCorrect = await compare(
          credentails!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("Invalid Credentails");
        }

        return user;
      },
    }),
  ],
  pages: { signIn: "/signin" },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      const user = token.user as IUser;
      session.user = user;

      return session;
    },
  },
};
export default NextAuth(authOptions);

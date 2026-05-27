import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("ইমেইল এবং পাসওয়ার্ড দিন");
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user) {
          throw new Error("এই ইমেইল দিয়ে কোনো অ্যাকাউন্ট নেই");
        }

        const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordMatch) {
          throw new Error("পাসওয়ার্ড ভুল হয়েছে");
        }

        // ✅ user এবং admin উভয়ই login করতে পারবে
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/en/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
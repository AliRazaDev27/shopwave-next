import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { connectDB } from './lib/db';
import user from '@/lib/models/userModel';
import bcrypt from 'bcrypt'

async function getUser(email) {
  await connectDB()
  const data = await user.findOne({ email: email }).lean()
  return data
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials
        const user = await getUser(email)
        if (user) {
          const checkPassword = await bcrypt.compare(password, user.password)
          if (!checkPassword) {
            return null
          }
          return user
        }
        return null
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id
        session.user.role = token.role
      }
      return session
    }
  }
});



import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogin";

export const authOptions: AuthOptions = {
    providers: [
      
        // Authentication Provider, use Credentials Provider
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
              
              email: { label: "Email", type: "email", placeholder: "email" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if(!credentials) return null
        const user = await userLogin(credentials.email, credentials.password) 
        if (!user || !user.id) return null
        return user
      }
    })
    ],
    session: { strategy: "jwt" },
    // callbacks: {
    //   async jwt({token, user}) {
    //     return {...token, ...user}
    //   },
    //   async session({session, token, user}) {
    //     session.user = token as any
    //     return session
    //   },
    // },
    // pages: {
    //   signIn: "/auth/signin", 
    // },
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          const u = user as any
          token.accessToken = u.token
          token.name = u.name
          token.email = u.email
          token.id = u.id         // <<<< เพิ่มบรรทัดนี้
          token.role = u.role
        }
        return token
      },
      async session({ session, token }) {
        session.user = {
          name: token.name ?? '',
          email: token.email ?? '',
          role: token.role ?? '',
          id: token.id ?? ''
        }
        session.accessToken = token.accessToken ?? ''
        return session
      }
    },
}
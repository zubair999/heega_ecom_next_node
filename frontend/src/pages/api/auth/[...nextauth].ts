import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import UserModel from "@models/user";
import  { connectDB } from "@utils/db";

export default  NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID ?? "",
      clientSecret: process.env.FACEBOOK_SECRET ?? ""
    }),
  ],
  
  callbacks: {
    async session({session, user}) {
      
      // console.log("session seoi")
      // console.log(session)
      // console.log(user);

      return session // The type here should match the one returned in `useSession()`
    },
    async signIn({profile}) {
      console.log("facebo")
      console.log(profile);
      try {
        await connectDB()

        const userExists = await UserModel.findOne({email: profile?.email})

        if(!userExists) {
          await UserModel.create({
            googleId: "8981",
            displayName: profile?.name,
            email: profile?.email
          })
        }
        return true
      } catch (error) {
        console.log("eroro rororor oro")
        console.log(error)
      }


      return true
    }
  },
  secret: "my_secret"
});

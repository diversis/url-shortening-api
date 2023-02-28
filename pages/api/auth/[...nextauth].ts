import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import YandexProvider from "next-auth/providers/yandex";
import VkProvider from "next-auth/providers/vk";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID as string,
            clientSecret: process.env.YANDEX_CLIENT_SECRET as string,
        }),
        VkProvider({
            clientId: process.env.VK_CLIENT_ID as string,
            clientSecret: process.env.VK_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        session: async ({ session, user }) => {
            if (session?.user) {
                session.user.id = user.id;
            }
            return session;
        },
    },
};

export default NextAuth(authOptions);

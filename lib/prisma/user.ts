import prisma from "@/lib/prisma";
import { User, Session } from "@prisma/client";

export async function getUserBySession(id: User["id"]) {
    return prisma.user.findUnique({ where: { id } });
}

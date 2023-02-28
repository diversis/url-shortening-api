import prisma from "@/lib/prisma";
import { SavedShort } from "@prisma/client";

export async function addShortUrl(
    userId: string,
    ugly: string,
    pretty: string,
) {
    try {
        const oldRecord = await prisma.savedShort.findFirstOrThrow({
            where: {
                AND: [
                    {
                        userId: {
                            equals: userId,
                        },
                        pretty: {
                            equals: pretty,
                        },
                    },
                ],
            },
        });
        return new Response("Url already in list: " + oldRecord.pretty);
    } catch (NotFoundError) {
        await prisma.savedShort.create({
            data: {
                userId,
                ugly,
                pretty,
            },
        });
        return "Url saved.";
    }
}

export async function getShortUrls(userId: string) {
    const data: SavedShort[] = await prisma.savedShort.findMany({
        where: {
            userId,
        },
        select: {
            ugly: true,
            pretty: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    });
    data.map((item) => {
        item.createdAt = Math.floor(+item.createdAt / 1000);
        return item;
    });
    console.log(data);
    return { urls: data };
}

import prisma from "@/lib/prisma";

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
        return new Response("link already in list: " + oldRecord.pretty);
    } catch (NotFoundError) {
        await prisma.savedShort.create({
            data: {
                userId,
                ugly,
                pretty,
            },
        });
        return "Your review has been successfully posted.";
    }
}

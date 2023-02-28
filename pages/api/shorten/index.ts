import { addShortUrl } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { type ZodString, z, ZodError } from "zod";
import { authOptions } from "pages/api/auth/[...nextauth]";
import axios, { type AxiosResponse } from "axios";
import makeid from "@/components/shared/makeId";

const formSchema: ZodString = z.string().url();

const shrtcode = axios.create({
    baseURL: "https://api.shrtco.de/v2",
    timeout: 1000,
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        let uglyUrl = req.body.url;
        console.log(req.body.url);
        try {
            formSchema.parse(uglyUrl);
        } catch (e: unknown) {
            console.log(e.errors[0].message);
            if (e instanceof ZodError)
                res.status(400).json({ url: e.errors[0].message });
            return;
        }
        const session = await getServerSession(req, res, authOptions);

        let response: AxiosResponse<unknown, unknown>;
        // Axios fetch
        try {
            response = await shrtcode("/shorten?url=" + req.body.url);
        } catch (e) {
            console.log(e);
            res.status(500).json({ error: e.errors[0].message });
        }
        console.log(response.data);
        const mockPretty = makeid(6).toString();
        let shortenedUrl = "";
        if (!!session && session.user && response.data?.ok) {
            try {
                shortenedUrl = response.data.result?.full_short_link;
                console.log(shortenedUrl);
                addShortUrl(session.user.id, req.body.url, shortenedUrl);
            } catch (e) {
                console.log(e);
            }
        }

        res.status(200).json({
            ugly: req.body.url,
            pretty: shortenedUrl,
        });
        return;
    }
}

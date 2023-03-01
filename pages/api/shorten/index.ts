import { addShortUrl } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { type ZodString, z, ZodError } from "zod";
import { authOptions } from "pages/api/auth/[...nextauth]";
import axios, { AxiosError, type AxiosResponse } from "axios";
import makeid from "@/components/shared/makeId";

const formSchema: ZodString = z.string().url();

const shrtcode = axios.create({
    baseURL: "https://api.shrtco.de/v2",
    timeout: 1000,
});

export default async function handler(req, res) {
    if (req.method === "POST") {
        let uglyUrl = req.body.url;
        // console.log(req.body.url);

        try {
            formSchema.parse(uglyUrl);
        } catch (e: unknown) {
            if (e instanceof ZodError) {
                console.log(e.errors[0].message);
                res.status(400).json({ url: e.errors[0].message });
            } else {
                console.log(e);
                res.status(400).json({ url: JSON.stringify(e) });
            }

            return;
        }
        const session = await getServerSession(req, res, authOptions);

        // Axios fetch
        let response: AxiosResponse<unknown, unknown>;

        try {
            response = await shrtcode("/shorten?url=" + req.body.url);
        } catch (e) {
            if (e instanceof AxiosError) {
                if (e.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(e.response.data);
                    console.log(e.response.status);
                    console.log(e.response.headers);
                } else if (e.request) {
                    // The request was made but no response was received
                    // `e.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log(e.request);
                } else {
                    // Something happened in setting up the request that triggered an e
                    console.log("error", e.message);
                }
                console.log(e.config);

                res.status(500).json({ error: e.toJSON() });
            } else {
                res.status(500).json({ error: e });
            }
        }

        // console.log(response.data);

        let shortenedUrl = "";
        if (!!session && session.user && response?.data?.ok) {
            try {
                shortenedUrl = response.data.result?.full_short_link;
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

import { type ZodString, z, ZodError } from "zod";

const formSchema: ZodString = z.string().url();

export default function handler(req, res) {
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

        res.status(200).redirect(307, "/");
    }
}

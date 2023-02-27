import { z } from "zod";

const formSchema = z.string().url();

export default function handler(req, res) {
    if (req.method === "POST") {
        let uglyUrl = req.body.url;
        console.log(req.body.url);
        try {
            formSchema.parse(uglyUrl);
        } catch (e) {
            res.status(400).json({ e });
            return;
        }

        res.status(200).redirect(307, "/");
    }
}

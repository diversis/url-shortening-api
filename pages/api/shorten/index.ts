import { z } from "zod";

const formSchema = z.string().url();

export default function handler(req, res) {
    if (req.method === "POST") {
        try {
            formSchema.parse(req.body.url);
        } catch (e) {
            res.status(400).json({ e });
            return;
        }
        console.log(" \n " + req.body.url);
        res.status(200).json({ data: "John Doe" });
    }
}

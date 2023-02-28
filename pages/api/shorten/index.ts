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

        res.status(200).json({
            ugly: req.body.url,
            pretty: makeid(6).toString(),
        });
        return;
    }
}
function makeid(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength),
        );
        counter += 1;
    }
    return result;
}

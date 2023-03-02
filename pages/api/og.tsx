/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
    runtime: "experimental-edge",
};

// const sfPro = fetch(
//     new URL("../../styles/SF-Pro-Display-Medium.otf", import.meta.url),
// ).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
    // const [sfProData] = await Promise.all([sfPro]);

    const { searchParams } = req.nextUrl;
    const title = searchParams.get("title") || "Precedent";

    return new ImageResponse(
        (
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "white",
                    backgroundImage:
                        "linear-gradient(0.45turn,#fff ,hsl(180deg,66%,83%) ,#fff)",
                }}
            >
                <img
                    src={new URL(
                        "../../public/favicon-32x32.png",
                        import.meta.url,
                    ).toString()}
                    alt="Frontend Mentor Logo"
                    tw="w-20 h-20 mb-4 opacity-95"
                />
                <h1
                    style={{
                        fontSize: "100px",
                        fontFamily: "Poppins",
                        background: "#fff",
                        backgroundClip: "text",
                        color: "transparent",
                        lineHeight: "5rem",
                        letterSpacing: "-0.02em",
                    }}
                >
                    {title}
                </h1>
            </div>
            // {
            //     width: 1200,
            //     height: 630,
            //     fonts: [
            //         {
            //             name: "SF Pro",
            //             data: sfProData,
            //         },
            //     ],
            // },
        ),
    );
}

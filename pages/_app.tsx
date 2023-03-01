import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider as RWBProvider } from "react-wrap-balancer";

export default function MyApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
    return (
        <SessionProvider session={session}>
            <RWBProvider>
                <div>
                    <Component {...pageProps} />
                </div>
            </RWBProvider>

            <Analytics />
        </SessionProvider>
    );
}

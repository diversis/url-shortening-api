import EleGlow from "@/components/shared/ele-glow";
import { getShortUrls } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { useSession } from "next-auth/react";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Layout from "@/components/layout";

export async function getServerSideProps(context) {
    const session = await getServerSession(
        context.req,
        context.res,
        authOptions,
    );

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const listOfPrettyUrls = await getShortUrls(session.user?.id);
    return {
        props: {
            session,
            listOfPrettyUrls,
        },
    };
}

export default function Dashboard({ session, listOfPrettyUrls }) {
    const listOfUrls = listOfPrettyUrls.urls;
    console.log(listOfUrls);
    return (
        <Layout>
            <div className="container flex w-full flex-col gap-2 py-8 px-4 xl:gap-4">
                {listOfUrls &&
                    Array.isArray(listOfUrls) &&
                    listOfUrls.length > 0 &&
                    listOfUrls.map((item, id) => {
                        const date = new Date(item.createdAt * 1000);
                        let options = {
                            weekday: "short",
                            year: "numeric",
                            month: "numeric",
                            day: "numeric",
                        };

                        return (
                            <>
                                <div
                                    key={item.pretty + "-" + id}
                                    className="flex flex-col items-start gap-6 xl:flex-row xl:items-center xl:justify-between"
                                >
                                    <div>
                                        {date.toLocaleDateString(
                                            "en-US",
                                            options,
                                        )}
                                        <span className="mx-2 border-x-2 border-solid border-tneutral-500/50 px-2">
                                            {date.getHours()}:
                                            {date.getMinutes()}
                                        </span>
                                    </div>
                                    <div className="w-full flex-1 ">
                                        {item.ugly}
                                    </div>
                                    <div className="w-full flex-1 xl:w-1/2 ">
                                        <EleGlow
                                            Tag="Link"
                                            href={item.pretty}
                                            target="_blank"
                                            rel="noreferrer"
                                            offset="5px"
                                            opacity="0.5"
                                            rx="8px"
                                            className="w-fit px-2 text-primary-500 [&:is(:hover,:focus)]:underline"
                                        >
                                            {item.pretty}
                                        </EleGlow>
                                    </div>
                                    <EleGlow
                                        className="w-full self-center rounded-lg bg-primary-500 p-2 text-white 
                                        transition-all duration-150 ease-in data-[copium=true]:!bg-surface-500 
                                        data-[copium=true]:!text-white xl:w-32
                                        [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                                        rx="8px"
                                        type="button"
                                        onClick={(e) => {
                                            clearTimeout(timeout);
                                            navigator.clipboard.writeText(
                                                item.pretty,
                                            );

                                            e.target.setAttribute(
                                                "data-copium",
                                                true,
                                            );
                                            e.target.innerText = "Copium";

                                            timeout = setTimeout(() => {
                                                e.target.setAttribute(
                                                    "data-copium",
                                                    false,
                                                );
                                                e.target.innerText = "Copy";
                                                onCooldown = false;
                                            }, 3000);

                                            if (!onCooldown) {
                                                onCooldown = true;
                                                toast("Copium!!!!!!!!!!!!!!");
                                            }
                                        }}
                                    >
                                        Copy
                                    </EleGlow>
                                </div>
                                {id < listOfUrls.length - 1 && (
                                    <hr className="w-full border-b border-solid border-tneutral-500/50" />
                                )}
                            </>
                        );
                    })}
            </div>
        </Layout>
    );
}

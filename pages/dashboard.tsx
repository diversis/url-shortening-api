import { ShortUrlFromDB, getShortUrls } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { type Session } from "next-auth";
import { SavedShort } from "@prisma/client";
import { ClipboardCopy } from "lucide-react";
import { ToastContainer } from "react-toastify";
import useWindowSize from "@/lib/hooks/use-window-size";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSidePropsContext } from "next";
import GlowWrap from "@/components/shared/glowwrap";
import { useEffect, useState } from "react";
import { handleCopy } from "@/lib/handleTextCopy";

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const session: Session | null = await getServerSession(
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

    const listOfPrettyUrls: { urls: ShortUrlFromDB[] } = await getShortUrls(
        session.user?.id,
    );
    return {
        props: {
            listOfPrettyUrls: JSON.parse(JSON.stringify(listOfPrettyUrls)),
        },
    };
};

export default function Dashboard({
    listOfPrettyUrls,
}: {
    listOfPrettyUrls: { urls: SavedShort[] };
}): JSX.Element {
    const [listOfUrls, setListOfUrls] = useState([]);
    useEffect(() => {
        setListOfUrls(listOfPrettyUrls.urls as SavedShort[] as never);
    }, [listOfPrettyUrls.urls]);
    const { isDesktop } = useWindowSize();

    return (
        <Layout>
            <div className="flex w-full flex-col items-center gap-4 xl:gap-8  ">
                <div className="w-full animate-bg-slide border-b border-solid border-tneutral-500/50 bg-primary-600 bg-[url(/images/bg-shorten-mobile.svg)] bg-[size:50%+800%] bg-no-repeat xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:bg-[size:200%+400%]">
                    <h3 className="mx-auto py-4 text-center text-white">
                        Your Saved Links
                    </h3>
                    <ToastContainer
                        position={isDesktop ? "bottom-right" : "top-center"}
                        limit={isDesktop ? 5 : 3}
                        newestOnTop={true}
                        pauseOnFocusLoss={false}
                    />
                </div>

                <table className="container  mx-auto mb-8 flex table-fixed flex-col px-4 xl:table ">
                    <thead className="relative hidden w-full  overflow-hidden xl:table-header-group ">
                        <tr className="table-row animate-bg-slide bg-primary-600 bg-none  bg-no-repeat  text-white xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:bg-[size:200%+400%]">
                            <th
                                scope="col"
                                className="table-cell w-full rounded-tl-lg border-r border-solid border-tneutral-500/50 py-2 xl:w-[20ch]"
                            >
                                Save Date
                            </th>
                            <th
                                scope="col"
                                className="border-r border-solid border-tneutral-500/50 py-2"
                            >
                                Ugly Url
                            </th>
                            <th
                                scope="col"
                                className="border-r border-solid border-tneutral-500/50 py-2"
                            >
                                Pretty Url
                            </th>
                            <th
                                scope="col"
                                className="w-[10ch] rounded-tr-lg py-2"
                            >
                                Copy Url
                            </th>
                        </tr>
                    </thead>
                    <tbody className="container flex w-full flex-col rounded-b-lg border-solid border-tneutral-500/50 xl:table-row-group xl:border [&>*:nth-child(even)]:bg-primary-600/80 [&>*:nth-child(even)]:text-white">
                        {listOfUrls &&
                            Array.isArray(listOfUrls) &&
                            listOfUrls.length > 0 &&
                            listOfUrls.map((item: SavedShort) => {
                                const date = new Date(item.createdAt);
                                const options: Intl.DateTimeFormatOptions = {
                                    weekday: "short",
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "numeric",
                                };
                                let timeout: NodeJS.Timeout;
                                let onCooldown = false;
                                return (
                                    <tr
                                        key={item.pretty + "-row"}
                                        className=" flex w-full flex-col items-center border-b border-solid border-tneutral-500/50 text-center xl:table-row xl:text-left  "
                                    >
                                        <td
                                            scope="row"
                                            className=" table-cell w-full border-r border-solid border-tneutral-500/50 p-2 xl:w-min"
                                        >
                                            {date.toLocaleDateString(
                                                "en-US",
                                                options,
                                            )}
                                        </td>
                                        <td
                                            scope="row"
                                            className="table-cell w-full border-r border-solid border-tneutral-500/50 p-2"
                                        >
                                            {item.ugly}
                                        </td>
                                        <td
                                            scope="row"
                                            className="table-cell w-full border-r border-solid border-tneutral-500/50 p-2 xl:w-1/2"
                                        >
                                            <GlowWrap
                                                offset="5px"
                                                opacity="0.5"
                                                rx="8px"
                                                className="mx-auto w-fit xl:m-0 "
                                            >
                                                <a
                                                    href={item.pretty}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="w-fit px-2 text-primary-500 xl:m-0 [&:is(:hover,:focus)]:underline"
                                                >
                                                    {item.pretty}
                                                </a>
                                            </GlowWrap>
                                        </td>
                                        <td
                                            scope="row"
                                            className=" table-cell w-full p-2"
                                        >
                                            <GlowWrap
                                                className="mx-auto !flex w-full flex-row items-center justify-center self-center rounded-lg xl:w-min"
                                                rx="8px"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={(e) =>
                                                        handleCopy({
                                                            e,
                                                            timeout,
                                                            onCooldown,
                                                            textToCopy:
                                                                item.pretty,
                                                        })
                                                    }
                                                    className=" mx-auto !flex w-full flex-row items-center justify-center rounded-lg 
                                            border-2 border-transparent bg-primary-500 p-1 text-white
                                        transition-all duration-150 ease-in active:border-tneutral-500 data-[copium='true']:!bg-surface-500
                                        data-[copium='true']:!text-white xl:w-min [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600 [&>*]:pointer-events-none"
                                                >
                                                    <ClipboardCopy />
                                                    <span className="inline-block px-2 xl:hidden ">
                                                        Copy
                                                    </span>
                                                </button>
                                            </GlowWrap>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

import { ShortUrlFromDB, getShortUrls } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { type Session } from "next-auth";
import { SavedShort } from "@prisma/client";
import { ClipboardCopy } from "lucide-react";
import { useSession } from "next-auth/react";
import { ToastContainer, toast } from "react-toastify";
import useWindowSize from "@/lib/hooks/use-window-size";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSidePropsContext } from "next";
import GlowWrap from "@/components/shared/glowwrap";

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
    const listOfUrls: SavedShort[] = listOfPrettyUrls.urls;
    const { isDesktop } = useWindowSize();
    // console.log(listOfUrls);
    return (
        <Layout>
            <ToastContainer
                position={isDesktop ? "bottom-right" : "top-center"}
                limit={isDesktop ? 5 : 3}
                newestOnTop={true}
                pauseOnFocusLoss={false}
            />
            <div className="w-full  border-b border-solid border-tneutral-500/50">
                <h3 className="mx-auto text-center">Your Saved Links</h3>
            </div>

            <table className="container mx-auto mb-8 flex table-fixed flex-col  px-4 xl:table">
                <thead className="hidden  w-full xl:table-header-group">
                    <tr className="table-row bg-primary-600 py-2  text-white">
                        <th
                            scope="col"
                            className="table-cell w-full rounded-tl-lg border-r border-solid border-tneutral-500/50 xl:w-[20ch]"
                        >
                            Save Date
                        </th>
                        <th
                            scope="col"
                            className="border-r border-solid border-tneutral-500/50"
                        >
                            Ugly Url
                        </th>
                        <th
                            scope="col"
                            className="border-r border-solid border-tneutral-500/50"
                        >
                            Pretty Url
                        </th>
                        <th scope="col" className="w-[10ch] rounded-tr-lg">
                            Copy Url
                        </th>
                    </tr>
                </thead>
                <tbody className="container flex w-full flex-col border-solid border-tneutral-500/50 xl:table-row-group xl:border [&>*:nth-child(even)]:bg-primary-600/80 [&>*:nth-child(even)]:text-white">
                    {listOfUrls &&
                        Array.isArray(listOfUrls) &&
                        listOfUrls.length > 0 &&
                        listOfUrls.map((item: SavedShort, id: number) => {
                            const date = new Date(+item.createdAt);
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
                                    key={item.pretty + "-" + id}
                                    className="flex w-full flex-col items-center border-b border-solid border-tneutral-500/50 text-center xl:table-row xl:text-left  "
                                >
                                    <td
                                        scope="row"
                                        className="table-cell w-full border-r border-solid border-tneutral-500/50 p-2 xl:w-min"
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
                                                onClick={(
                                                    e: React.MouseEvent<HTMLElement>,
                                                ) => {
                                                    clearTimeout(timeout);
                                                    navigator.clipboard.writeText(
                                                        item.pretty,
                                                    );
                                                    const target =
                                                        e.target as HTMLButtonElement;
                                                    target.setAttribute(
                                                        "data-copium",
                                                        "true",
                                                    );

                                                    timeout = setTimeout(() => {
                                                        target.setAttribute(
                                                            "data-copium",
                                                            "false",
                                                        );

                                                        onCooldown = false;
                                                    }, 3000);

                                                    if (!onCooldown) {
                                                        onCooldown = true;
                                                        toast.success(
                                                            "Copium!",
                                                            {
                                                                autoClose: 1500,
                                                            },
                                                        );
                                                    }
                                                }}
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
        </Layout>
    );
}

import EleGlow from "@/components/shared/ele-glow";
import { getShortUrls } from "@/lib/prisma/shortUrls";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import Layout from "@/components/layout";
import { type Session } from "next-auth";
import { SavedShort } from "@prisma/client";
import { ClipboardCopy, ClipboardCopyIcon } from "lucide-react";
import { useSession } from "next-auth/react";

export async function getServerSideProps(context) {
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

    const listOfPrettyUrls: { urls: SavedShort[] } = await getShortUrls(
        session.user?.id,
    );
    return {
        props: {
            listOfPrettyUrls,
        },
    };
}

export default function Dashboard({
    listOfPrettyUrls,
}: {
    listOfPrettyUrls: { urls: SavedShort[] };
}): JSX.Element {
    const listOfUrls: SavedShort[] = listOfPrettyUrls.urls;
    // console.log(listOfUrls);
    return (
        <Layout>
            <div className="w-full  border-b border-solid border-tneutral-500/50">
                <h3 className="mx-auto text-center">Your Saved Links</h3>
            </div>
            <table className="container mx-auto mb-8 flex table-fixed flex-col  px-4 xl:table">
                <thead className="hidden  w-full xl:table-header-group">
                    <tr className="table-row bg-primary-500/25  py-2">
                        <th
                            scope="col"
                            className="table-cell w-[20ch] rounded-tl-lg"
                        >
                            Save Date
                        </th>
                        <th scope="col">Ugly Url</th>
                        <th scope="col">Pretty Url</th>
                        <th scope="col" className="w-[10ch] rounded-tr-lg">
                            Copy Url
                        </th>
                    </tr>
                </thead>
                <tbody className="container flex w-full flex-col border-solid border-tneutral-500/50 xl:table-row-group xl:border [&>*:nth-child(even)]:bg-primary-500/25">
                    {listOfUrls &&
                        Array.isArray(listOfUrls) &&
                        listOfUrls.length > 0 &&
                        listOfUrls.map((item: SavedShort, id: number) => {
                            const date = new Date(+item.createdAt * 1000);
                            let options = {
                                weekday: "short",
                                year: "numeric",
                                month: "numeric",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                            };

                            return (
                                <>
                                    <tr
                                        key={item.pretty + "-" + id}
                                        className="flex w-full flex-col items-center border-b border-solid border-tneutral-500/50 text-center xl:table-row xl:text-left  "
                                    >
                                        <td
                                            scope="row"
                                            className="w-min border-r border-solid border-tneutral-500/50 p-1"
                                        >
                                            {date.toLocaleDateString(
                                                "en-US",
                                                options,
                                            )}
                                        </td>
                                        <td
                                            scope="row"
                                            className="w-full border-r border-solid border-tneutral-500/50 p-1"
                                        >
                                            {item.ugly}
                                        </td>
                                        <td
                                            scope="row"
                                            className="w-full border-r  border-solid border-tneutral-500/50 p-1 xl:w-1/2"
                                        >
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
                                        </td>
                                        <td scope="row" className=" w-full p-1">
                                            <EleGlow
                                                className="mx-auto !flex w-full flex-row items-center justify-center rounded-lg bg-primary-500 
                                        p-1 text-white transition-all duration-150 
                                        ease-in data-[copium=true]:!bg-surface-500 data-[copium=true]:!text-white xl:w-min
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
                                                    e.target.innerText =
                                                        "Copium";

                                                    timeout = setTimeout(() => {
                                                        e.target.setAttribute(
                                                            "data-copium",
                                                            false,
                                                        );
                                                        e.target.innerText =
                                                            "Copy";
                                                        onCooldown = false;
                                                    }, 3000);

                                                    if (!onCooldown) {
                                                        onCooldown = true;
                                                        toast(
                                                            "Copium!!!!!!!!!!!!!!",
                                                        );
                                                    }
                                                }}
                                            >
                                                <ClipboardCopy />
                                                <span className="inline-block px-2 xl:hidden ">
                                                    Copy
                                                </span>
                                            </EleGlow>
                                        </td>
                                    </tr>
                                    {/* {id < listOfUrls.length - 1 && (
                                        <hr className="w-full border-b border-solid border-tneutral-500/50" />
                                    )} */}
                                </>
                            );
                        })}
                </tbody>
            </table>
        </Layout>
    );
}

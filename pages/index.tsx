import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import GlowWrap from "@/components/shared/glowwrap";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/shared/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import useWindowSize from "@/lib/hooks/use-window-size";
import useLocalStorage from "@/lib/hooks/use-local-storage";
import makeid from "@/components/shared/makeId";
import { ShortUrlFromDB } from "@/lib/prisma/shortUrls";
import { motion } from "framer-motion";
import {
    FADE_DOWN_ANIMATION_VARIANTS,
    FADE_IN_ANIMATION_SETTINGS,
} from "@/lib/constants";
import { handleCopy } from "@/lib/handleTextCopy";

async function saveFormData(data: object): Promise<Response> {
    return await fetch("/api/shorten", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

export default function Home(): JSX.Element {
    const [urlList, setUrlList] = useLocalStorage("urlList", []);
    const { isDesktop } = useWindowSize();

    const {
        register,
        handleSubmit,
        setError,
        reset,
        setFocus,

        formState: {
            isSubmitting,
            errors,
            isSubmitSuccessful,
            isDirty,
            isValid,
        },
    } = useForm();
    let hasErrors = false;
    const onSubmit = async (data: FieldValues) => {
        const response = await saveFormData(data);
        if (response.status === 400) {
            // Validation error
            const fieldToErrorMessage: { [fieldName: string]: string } =
                await response.json();
            console.log(fieldToErrorMessage);
            for (const [fieldName, errorMessage] of Object.entries(
                fieldToErrorMessage,
            )) {
                setError(fieldName, { type: "custom", message: errorMessage });
            }
        } else if (response.ok) {
            // successful
            const resBody = await response.json();
            const urlList = resBody as ShortUrlFromDB[];
            if (Array.isArray(urlList)) {
                setUrlList([
                    { ugly: resBody.ugly, pretty: resBody.pretty },
                    ...urlList.slice(-2),
                ] as never);
            } else {
                setUrlList([
                    { ugly: resBody.ugly, pretty: resBody.pretty },
                ] as never);
            }

            toast.success("What a pretty URL here");
        } else {
            // unknown error

            const res = response as Response & {
                error: {
                    message: string;
                };
            };
            toast.error(
                "An unexpected error occurred while processing, please try again" +
                    res.error?.message,
            );
        }
    };
    useEffect(() => {
        reset({
            url: "",
        });
    }, [isSubmitSuccessful]);
    return (
        <Layout>
            <div className="flex w-full flex-col items-center gap-16 xl:gap-32  ">
                {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
                <div className="container flex w-full animate-[slide-down-fade_0.5s_ease-in-out] flex-col gap-5  xl:flex-row-reverse">
                    <section className="relative w-full overflow-visible  xl:w-1/2">
                        <motion.div
                            {...FADE_IN_ANIMATION_SETTINGS}
                            variants={FADE_DOWN_ANIMATION_VARIANTS}
                        >
                            <Image
                                src="/images/illustration-working.svg"
                                alt="Hero"
                                width={400}
                                height={400}
                                className="relative -right-[15%] w-screen xl:-right-10"
                                priority
                            />
                        </motion.div>
                    </section>
                    <section className="w-full self-center px-5 xl:w-1/2">
                        <article className="flex flex-col items-center gap-4 xl:items-start">
                            <h1 className="w-full text-center text-surface-600 xl:text-left">
                                <Balancer>
                                    More than just shorter links
                                </Balancer>
                            </h1>
                            <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
                                <Balancer>
                                    Build your brand's recognition and get
                                    detailed insights on how your links are
                                    performing.
                                </Balancer>
                            </p>
                            <GlowWrap
                                className="mt-8 rounded-full "
                                offset="0px"
                                rx="25px"
                            >
                                <button
                                    onClick={() => {
                                        setFocus("url");
                                    }}
                                    className="rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-150 ease-in xl:self-start [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                                >
                                    Get Started
                                </button>
                            </GlowWrap>
                        </article>
                    </section>
                </div>
                {/* Form */}

                <div className="container  flex animate-[slide-down-fade_0.5s_ease-in-out] flex-col gap-5 px-5 xl:gap-8">
                    <ToastContainer
                        position={isDesktop ? "bottom-right" : "top-center"}
                        limit={5}
                        newestOnTop={true}
                        pauseOnFocusLoss={false}
                    />{" "}
                    <form
                        id="form-url"
                        onSubmit={handleSubmit(onSubmit)}
                        action="/api/shorten"
                        method="post"
                        className="relative flex animate-bg-slide flex-col justify-between gap-4 rounded-lg bg-primary-600 bg-[url(/images/bg-shorten-mobile.svg)] bg-[size:400%+400%] bg-no-repeat p-4 align-middle xl:flex-row xl:gap-8 xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:bg-[size:200%+200%] xl:px-12 xl:pt-10"
                    >
                        <div className="relative w-full xl:w-5/6">
                            <input
                                onFocus={(e) => {
                                    e.target.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                        inline: "nearest",
                                    });
                                }}
                                aria-label="Shorten url"
                                title="Shorten url"
                                id="url"
                                type="text"
                                placeholder="Shorten a link here"
                                className="peer relative h-[3.5rem] w-full rounded-lg px-4  text-base placeholder:text-transparent invalid:[&:not(:placeholder-shown)]:border-red-600"
                                pattern="[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?"
                                required
                                {...register("url", { required: true })}
                            />
                            <label
                                htmlFor="url"
                                className="input-transition pointer-events-none absolute top-[1rem] left-4 z-10  rounded-lg bg-transparent px-1 text-base text-tneutral-600 
                        peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-xs
                          "
                            >
                                Shorten a link here
                            </label>
                            <div className="h-6 text-sm text-red-500">
                                {isDirty && (errors?.url?.message as string)}
                            </div>
                        </div>

                        <GlowWrap
                            className="h-[3.5rem] w-full xl:w-1/6"
                            rx="8px"
                        >
                            <button
                                className="h-[3.5rem] w-full rounded-lg bg-primary-500 px-4 text-white transition-all duration-150 ease-in [&:is(:hover,:focus)]:bg-primary-500/50 "
                                type="submit"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="absolute inset-0  flex flex-row items-center justify-center">
                                        <b className="w-8">
                                            <LoadingSpinner />
                                        </b>
                                        Shortening...
                                    </span>
                                ) : (
                                    "Shorten it!"
                                )}
                            </button>
                        </GlowWrap>
                    </form>
                    {/* <div className="relative w-full flex-none overflow-hidden rounded-lg border border-solid border-tneutral-500/25"> */}
                    {/* <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/70 to-transparent"></div> */}
                    <div className="flex w-full flex-col gap-8 py-4 px-8">
                        {urlList.length > 0 &&
                            urlList.slice(0, 3).map((item) => {
                                const shortUrl = item as ShortUrlFromDB;
                                let timeout: NodeJS.Timeout;
                                let onCooldown = false;
                                return (
                                    <div
                                        key={
                                            shortUrl.pretty +
                                            makeid(6).toString()
                                        }
                                        className="flex flex-col items-start gap-6 xl:flex-row xl:items-center xl:justify-between"
                                    >
                                        <div className="w-full flex-1 ">
                                            {shortUrl.ugly}
                                        </div>
                                        <div className="w-full flex-1 text-primary-500 xl:w-1/2">
                                            {shortUrl.pretty}
                                        </div>
                                        <GlowWrap
                                            className="w-full self-center xl:w-32"
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
                                                            shortUrl.pretty,
                                                    })
                                                }
                                                className="w-full rounded-lg bg-primary-500 p-2 text-white 
                                        transition-all duration-150 ease-in data-[copium=true]:!bg-surface-500 
                                        data-[copium=true]:!text-white xl:w-32
                                        [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                                            >
                                                Copy
                                            </button>
                                        </GlowWrap>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                {/* </div> */}
                {/* Advanced Statistics */}
                <article className="container  flex w-full flex-col items-center px-5">
                    <h2 className="py-6 text-surface-600">
                        Advanced Statistics
                    </h2>
                    <p className="w-full max-w-[60ch] text-center text-lg text-tneutral-600">
                        <Balancer ratio={0.65}>
                            Track how your links are performing across the web
                            with our advanced statistics dashboard
                        </Balancer>
                    </p>
                </article>
                {/* flex-3 */}
                <div className="container flex w-full flex-col items-center gap-8 px-5 xl:flex-row">
                    <article className="flex flex-col items-start gap-6 xl:w-1/3 xl:self-start">
                        <div className="mx-auto mb-4 w-1/4 rounded-full bg-primary-600 xl:mx-[initial]">
                            <Image
                                src="/images/icon-brand-recognition.svg"
                                alt="Brand Recognition"
                                width={250}
                                height={250}
                                className="w-full p-[25%]"
                            ></Image>
                        </div>
                        <h3 className="w-full text-center text-surface-600 xl:text-left">
                            Brand Recognition
                        </h3>
                        <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
                            <Balancer>
                                Boost your brand recognition with each click.
                                Generic links don’t mean a thing. Branded links
                                help instil confidence in your content.
                            </Balancer>
                        </p>
                    </article>
                    <hr className="h-12 w-2 flex-auto bg-primary-500 xl:h-2 xl:w-12" />
                    <article className="flex flex-col items-start gap-6 xl:w-1/3">
                        <div className="mx-auto mb-4 w-1/4 rounded-full bg-primary-600 xl:mx-[initial]">
                            <Image
                                src="/images/icon-detailed-records.svg"
                                alt="Detailed Records"
                                width={250}
                                height={250}
                                className="w-full p-[25%]"
                            ></Image>
                        </div>
                        <h3 className="w-full text-center text-surface-600 xl:text-left">
                            Detailed Records
                        </h3>
                        <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
                            <Balancer>
                                Gain insights into who is clicking your links.
                                Knowing when and where people engage with your
                                content helps inform better decisions.
                            </Balancer>
                        </p>
                    </article>
                    <hr className="h-12 w-2 flex-auto bg-primary-500 xl:h-2 xl:w-12" />
                    <article className="flex flex-col items-start gap-6 p-0 xl:w-1/3 xl:self-end xl:pt-16">
                        <div className="mx-auto mb-4 w-1/4 rounded-full bg-primary-600 xl:mx-[initial]">
                            <Image
                                src="/images/icon-fully-customizable.svg"
                                alt="Fully Customizable"
                                width={250}
                                height={250}
                                className="w-full p-[25%]"
                            ></Image>
                        </div>
                        <h3 className="w-full text-center text-surface-600 xl:text-left">
                            Fully Customizable
                        </h3>
                        <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
                            <Balancer>
                                Improve brand awareness and content
                                discoverability through customizable links,
                                supercharging audience engagement.
                            </Balancer>
                        </p>
                    </article>
                </div>
                <div className="w-full animate-bg-slide bg-primary-600 bg-[url(/images/bg-boost-mobile.svg)] bg-[size:200%+200%] bg-no-repeat  p-0 xl:bg-[url(/images/bg-boost-desktop.svg)] ">
                    <article className="mx-auto flex flex-col  items-center  py-16">
                        <h2 className="text-white">Boost your links today</h2>
                        <GlowWrap
                            className="mt-8 rounded-full "
                            offset="0px"
                            rx="25px"
                        >
                            <button
                                onClick={() => setFocus("url")}
                                className="rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-150 ease-in xl:self-start [&:is(:hover,:focus)]:bg-primary-500/50"
                            >
                                Get Started
                            </button>
                        </GlowWrap>
                    </article>
                </div>
            </div>
        </Layout>
    );
}

import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
// import { motion } from "framer-motion";
import Image from "next/image";
import EleGlow from "@/components/shared/ele-glow";
import { useForm } from "react-hook-form";
import { LoadingSpinner } from "@/components/shared/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import useWindowSize from "@/lib/hooks/use-window-size";
import useLocalStorage from "@/lib/hooks/use-local-storage";

async function saveFormData(data: object) {
    return await fetch("/api/shorten", {
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        method: "POST",
    });
}

export default function Home() {
    const [urlList, setUrlList] = useLocalStorage("urlList", []);
    const { isDesktop } = useWindowSize();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { isSubmitting, errors, isSubmitSuccessful },
    } = useForm();

    const copyToClipboard = async (text) => {
        navigator.clipboard.writeText(text);
    };

    const onSubmit = async (data: object) => {
        const response = await saveFormData(data);
        if (response.status === 400) {
            console.log("invalid");

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
            console.log(resBody.pretty);
            if (Array.isArray(urlList)) {
                setUrlList([
                    { ugly: resBody.ugly, pretty: resBody.pretty },
                    ...urlList,
                ]);
            } else {
                setUrlList([{ ugly: resBody.ugly, pretty: resBody.pretty }]);
            }
            toast.success("Successfully saved");
        } else {
            // unknown error
            toast.error(
                "An unexpected error occurred while saving, please try again",
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
            {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
            <div className="container my-10 flex w-full animate-[slide-down-fade_0.5s_ease-in-out] flex-col gap-5  xl:flex-row-reverse">
                <section className="relative w-full overflow-visible  xl:w-1/2">
                    <Image
                        src="/images/illustration-working.svg"
                        alt="Hero"
                        width={400}
                        height={400}
                        className="relative -right-[15%] w-screen xl:-right-10"
                        priority
                    />
                </section>
                <section className="w-full self-center px-5 xl:w-1/2">
                    <article className="flex flex-col items-center gap-4 xl:items-start">
                        <h1 className="w-full text-center text-surface-600 xl:text-left">
                            <Balancer>More than just shorter links</Balancer>
                        </h1>
                        <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
                            <Balancer>
                                Build your brand's recognition and get detailed
                                insights on how your links are performing.
                            </Balancer>
                        </p>
                        <EleGlow
                            className="mt-8 rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-150 ease-in xl:self-start [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                            offset="0px"
                            rx="25px"
                        >
                            Get Started
                        </EleGlow>
                    </article>
                </section>
            </div>
            {/* Form */}
            <ToastContainer
                position={isDesktop ? "bottom-right" : "top-center"}
                limit={5}
                newestOnTop={true}
                pauseOnFocusLoss={false}
            />
            <div className="container my-10 flex animate-[slide-down-fade_0.5s_ease-in-out] flex-col gap-8 gap-5 px-5">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    action="/api/shorten"
                    method="post"
                    className="relative flex flex-col justify-between gap-4 rounded-lg bg-primary-600 bg-[url(/images/bg-shorten-mobile.svg)] bg-cover bg-no-repeat p-4 align-middle xl:flex-row xl:gap-8 xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:px-12 xl:pt-10"
                >
                    <div className="relative w-full xl:w-5/6">
                        <input
                            aria-label="Shorten url"
                            title="Shorten url"
                            id="url"
                            type="text"
                            placeholder="Shorten a link here"
                            className="peer relative h-[3.5rem] w-full rounded-lg px-4  text-base placeholder:text-transparent "
                            pattern="[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?"
                            {...register("url", { required: true })}
                        />
                        <label
                            htmlFor="url"
                            className="input-transition pointer-events-none absolute top-[1rem] left-4 z-50  rounded-lg bg-transparent px-1 text-base text-tneutral-600 
                        peer-[&:not(:placeholder-shown)]:-translate-y-5 peer-[&:not(:placeholder-shown)]:bg-white peer-[&:not(:placeholder-shown)]:text-xs
                          "
                        >
                            Shorten a link here
                        </label>
                        <div className="h-6 text-sm text-red-500">
                            {errors?.url?.message}
                        </div>
                    </div>

                    <EleGlow
                        className="h-[3.5rem] w-full rounded-lg bg-primary-500 px-4 text-white transition-all duration-150 ease-in xl:w-1/6 [&:is(:hover,:focus)]:bg-primary-500/50 "
                        rx="8px"
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
                    </EleGlow>
                </form>
                <div className="container mx-auto flex flex-col gap-8 px-8">
                    {urlList.length > 0 &&
                        urlList.map((item) => {
                            return (
                                <div
                                    key={
                                        item.pretty +
                                        Date.now().toString().slice(-6)
                                    }
                                    className="flex flex-col items-start xl:flex-row xl:items-center xl:justify-between"
                                >
                                    <div className="w-full flex-auto py-2">
                                        {item.ugly}
                                    </div>
                                    <div className="w-1/2 flex-auto py-2 text-primary-500">
                                        {item.pretty}
                                    </div>
                                    <EleGlow
                                        className="w-full self-center rounded-lg bg-primary-500 p-2 text-white transition-all duration-150 ease-in xl:w-min  [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                                        rx="8px"
                                        type="button"
                                        onClick={() =>
                                            copyToClipboard(item.pretty)
                                        }
                                    >
                                        Copy
                                    </EleGlow>
                                </div>
                            );
                        })}
                </div>
            </div>
            {/* Advanced Statistics */}
            <article className="container mt-12 flex w-full flex-col items-center px-5">
                <h2 className="py-6 text-surface-600">Advanced Statistics</h2>
                <p className="w-full max-w-[60ch] text-center text-lg text-tneutral-600">
                    <Balancer ratio={0.65}>
                        Track how your links are performing across the web with
                        our advanced statistics dashboard
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
                            Generic links don’t mean a thing. Branded links help
                            instil confidence in your content.
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
                            Improve brand awareness and content discoverability
                            through customizable links, supercharging audience
                            engagement.
                        </Balancer>
                    </p>
                </article>
            </div>
            <div className="w-full bg-primary-600 bg-[url(/images/bg-boost-mobile.svg)] bg-cover bg-no-repeat p-0 xl:bg-[url(/images/bg-boost-desktop.svg)] ">
                <article className="mx-auto flex flex-col  items-center  py-16">
                    <h2 className="text-white">Boost your links today</h2>
                    <EleGlow
                        className="mt-8 rounded-full bg-primary-500 py-3 px-10 text-white transition-all duration-150 ease-in [&:is(:hover,:focus)]:bg-primary-500/50 "
                        offset="0px"
                        rx="25px"
                    >
                        Get Started
                    </EleGlow>
                </article>
            </div>
        </Layout>
    );
}

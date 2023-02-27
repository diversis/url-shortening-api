import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import Image from "next/image";
import eleGlow from "@/components/shared/ele-glow";

export default function Home() {
    return (
        <Layout>
            {/* here we are animating with Tailwind instead of Framer Motion because Framer Motion messes up the z-index for child components */}
            <div className="container my-10 flex w-full animate-[slide-down-fade_0.5s_ease-in-out] flex-col gap-5 px-5 xl:flex-row-reverse">
                <section className="relative w-full overflow-visible  xl:w-1/2">
                    <Image
                        src="/images/illustration-working.svg"
                        alt="Hero"
                        width={400}
                        height={400}
                        className="relative w-full xl:-right-5"
                    />
                </section>
                <section className="w-full self-center xl:w-1/2">
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
                        <interactableGlow
                            className="mt-8 rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-300 ease-in xl:self-start [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
                            offset="10px"
                            rx="20px"
                        >
                            Get Started
                        </interactableGlow>
                    </article>
                </section>
            </div>
            {/* Form */}
            <div className="container my-10 animate-[slide-down-fade_0.5s_ease-in-out] gap-5 px-5">
                <form className="flex flex-col justify-between gap-4 rounded-lg bg-primary-600 bg-[url(/images/bg-shorten-mobile.svg)] bg-cover bg-no-repeat p-4 align-middle xl:flex-row xl:gap-8 xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:py-10 xl:px-12">
                    <input
                        placeholder="Shorten a link here"
                        className="w-full rounded-lg px-4 py-3 xl:w-5/6"
                    ></input>
                    <interactableGlow
                        className="w-full rounded-lg bg-primary-500 px-4 py-3 text-white transition-all duration-300 ease-in xl:w-1/6 [&:is(:hover,:focus)]:bg-primary-500/50 "
                        offset="10px"
                        rx="8px"
                    >
                        Shorten it!
                    </interactableGlow>
                </form>
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
                    <h3 className="w-full text-surface-600">
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
                    <h3 className="w-full text-surface-600">
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
                    <h3 className="w-full text-surface-600">
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
                    <interactableGlow
                        className="mt-8 rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-300 ease-in [&:is(:hover,:focus)]:bg-primary-500/50 "
                        offset="10px"
                        rx="20px"
                    >
                        Get Started
                    </interactableGlow>
                </article>
            </div>
        </Layout>
    );
}

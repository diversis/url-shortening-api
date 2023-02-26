import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import { DEPLOY_URL, FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Github, Twitter } from "@/components/shared/icons";
import WebVitals from "@/components/home/web-vitals";
import ComponentGrid from "@/components/home/component-grid";
import Image from "next/image";
import ButtonGlow from "@/components/shared/button-glow";

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
            <h1 className="w-full text-center text-3xl font-bold xl:text-left xl:text-7xl">
              <Balancer>More than just shorter links</Balancer>
            </h1>
            <p className="w-full text-center text-base text-tneutral-600 xl:text-left">
              <Balancer>
                Build your brand's recognition and get detailed insights on how
                your links are performing.
              </Balancer>
            </p>
            <ButtonGlow
              className="mt-8 rounded-full bg-primary-500 px-10 py-3 text-white transition-all duration-300 ease-in xl:self-start [&:is(:hover,:focus)]:bg-primary-500/50 [&:is(:hover,:focus)]:text-surface-600"
              offset="10px"
              rx="20px"
            >
              Get Started
            </ButtonGlow>
          </article>
        </section>
      </div>
      <div className="my-10 w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] gap-5 px-5">
        <form className="flex flex-col justify-between gap-4 rounded-lg bg-primary-600 bg-[url(/images/bg-shorten-mobile.svg)] bg-cover bg-no-repeat p-4 align-middle xl:flex-row xl:gap-8 xl:bg-[url(/images/bg-shorten-desktop.svg)] xl:py-10 xl:px-12">
          <input
            placeholder="Shorten a link here"
            className="w-full rounded-lg px-4 py-2"
          ></input>
          <ButtonGlow
            className="min-w-[12ch] rounded-lg bg-primary-500 px-4 py-2 text-white transition-all duration-300 ease-in [&:is(:hover,:focus)]:bg-primary-500/50 "
            offset="10px"
            rx="8px"
          >
            Shorten it!
          </ButtonGlow>
        </form>
      </div>
      <article className="container flex w-full flex-col items-center">
        <h2 className="">Advanced statistics</h2>
        <p className="w-full max-w-[60ch] text-center text-base text-tneutral-600">
          <Balancer ratio={0.65}>
            Track how your links are performing across the web with our advanced
            statistics dashboard
          </Balancer>
        </p>
      </article>
    </Layout>
  );
}

const features = [
  {
    title: "One-click Deploy",
    description:
      "Jumpstart your next project by deploying Precedent to [Vercel](https://vercel.com/) in one click.",
    demo: (
      <div className="flex flex-row justify-between gap-8">
        <a href={DEPLOY_URL}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://vercel.com/button"
            alt="Deploy with Vercel"
            width={120}
          />
        </a>
        <ButtonGlow
          rx={"8px"}
          speed="1500ms"
          offset="10px"
          className="grid h-10 w-32 items-center rounded-lg bg-primary-600/90 px-4 py-1 text-center text-white"
          onClick={() => {
            console.log("click");
          }}
        >
          Hello bu
        </ButtonGlow>
      </div>
    ),
  },
];

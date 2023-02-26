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
      <div className="my-10 grid w-full max-w-screen-xl animate-[slide-down-fade_0.5s_ease-in-out] grid-cols-1 gap-5 px-5 md:grid-cols-3 xl:px-0">
        {features.map(({ title, description, demo, large }) => (
          <Card
            key={title}
            title={title}
            description={description}
            demo={
              title === "Beautiful, reusable components" ? (
                <ComponentGrid />
              ) : (
                demo
              )
            }
            large={large}
          />
        ))}
      </div>
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

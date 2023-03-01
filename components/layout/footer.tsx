import Link from "next/link";

import Facebook from "@/components/shared/icons/svg/icon-facebook.svg";
import Instagram from "@/components/shared/icons/svg/icon-instagram.svg";
import Twitter from "@/components/shared/icons/svg/icon-twitter.svg";
import Pinterest from "@/components/shared/icons/svg/icon-pinterest.svg";
import GlowWrap from "../shared/glowwrap";

const footerLinks = [
    {
        name: "Features",
        links: ["Link Shortening", "Branded Links", "Analytics"],
    },
    { name: "Resources", links: ["Blog", "Developers", "Support"] },
    { name: "Company", links: ["About", "Our Team", "Careers", "Contact"] },
];

const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/", icon: Facebook },
    { name: "Twitter", url: "https://www.twitter.com/", icon: Instagram },
    { name: "Instagram", url: "https://www.instagram.com/", icon: Twitter },
    { name: "Pinterest", url: "https://www.pinterest.com/", icon: Pinterest },
];
export default function footer() {
    return (
        <footer className="w-full overflow-hidden bg-surface-600 text-white">
            <div className="xl:gap-[clamp(2rem,10vw + 2rem,8rem)] container mx-auto flex w-full flex-col items-center justify-center gap-4 px-5 py-12 text-center xl:flex-row xl:justify-between xl:text-left">
                <Link
                    href="/"
                    className="font-display flex text-3xl font-bold xl:self-start xl:pr-16 "
                >
                    Shortly
                </Link>
                <div className="flex flex-col gap-4 xl:flex-row xl:gap-20 ">
                    {/* Links */}
                    {footerLinks?.length > 0 &&
                        footerLinks.map((key) => {
                            return (
                                <div
                                    key={key.name}
                                    className="flex flex-col gap-4"
                                >
                                    <h6>{key.name}</h6>
                                    <ul className="flex flex-col gap-2">
                                        {!!key &&
                                            key.links?.map((val) => {
                                                return (
                                                    <li
                                                        key={val}
                                                        className="[&:is(:hover,:focus)]:text-primary-500"
                                                    >
                                                        <GlowWrap
                                                            rx="10px"
                                                            opacity="1"
                                                            offset="10px"
                                                            speed="700ms"
                                                        >
                                                            <Link
                                                                href="/"
                                                                className=" text-sm transition-all duration-150 ease-in"
                                                            >
                                                                {val}
                                                            </Link>
                                                        </GlowWrap>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            );
                        })}
                    {/* Social Links */}
                    <div className="flex flex-row items-center gap-4 xl:items-start xl:gap-6">
                        {socialLinks.length > 0 &&
                            socialLinks.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <GlowWrap
                                        className=" h-8 w-8 transition-all duration-150 ease-in xl:h-12 xl:w-12"
                                        rx="10px"
                                        offset="10px"
                                        speed="700ms"
                                        key={item.name}
                                        data-glow-animation="grow"
                                    >
                                        <a href={item.url}>
                                            <Icon
                                                viewBox="0 0 24 24"
                                                className="h-8 w-8 fill-white transition-all duration-150 ease-in xl:h-12 xl:w-12 [&:is(:hover,:focus)]:!fill-primary-500"
                                            />
                                        </a>
                                    </GlowWrap>
                                );
                            })}
                    </div>
                </div>
            </div>
            {/* Attribution */}
            <div className="absolute hidden w-full border-t border-gray-200 bg-white py-5 text-center">
                <p className="text-tneutral-500">
                    Challenge by{" "}
                    <a
                        className="font-medium text-surface-600 underline transition-colors"
                        href="https://www.frontendmentor.io?ref=challenge"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Frontend Mentor
                    </a>
                    . Coded by{" "}
                    <a
                        className="font-medium text-surface-600 underline transition-colors"
                        href="https://github.com/diversis"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        diversis
                    </a>
                </p>
            </div>
        </footer>
    );
}

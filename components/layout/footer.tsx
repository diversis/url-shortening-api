import Link from "next/link";
import eleGlow from "../shared/ele-glow";
import Image from "next/image";

const footerLinks = [
    {
        name: "Features",
        links: ["Link Shortening", "Branded Links", "Analytics"],
    },
    { name: "Resources", links: ["Blog", "Developers", "Support"] },
    { name: "Company", links: ["About", "Our Team", "Careers", "Contact"] },
];

const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/" },
    { name: "Twitter", url: "https://www.twitter.com/" },
    { name: "Instagram", url: "https://www.instagram.com/" },
    { name: "Pinterest", url: "https://www.pinterest.com/" },
];
export default function footer() {
    return (
        <footer className="w-full bg-surface-600 text-white">
            <div className="container mx-auto flex flex-col items-center justify-center gap-4 px-8 py-12 text-center xl:flex-row xl:justify-between xl:text-left">
                <Link
                    href="/"
                    className="font-display flex items-baseline px-4 text-3xl font-bold  xl:pr-16 "
                >
                    Shortly
                </Link>
                <div className="flex flex-col justify-between gap-4 xl:w-full xl:flex-row xl:px-16">
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
                                                    <li key={val}>
                                                        <eleGlow
                                                            Tag="Link"
                                                            className=" text-sm transition-all duration-300 ease-in"
                                                            href="/"
                                                            rx="10px"
                                                            opacity="1"
                                                            offset="10px"
                                                            speed="700ms"
                                                        >
                                                            {val}
                                                        </eleGlow>
                                                    </li>
                                                );
                                            })}
                                    </ul>
                                </div>
                            );
                        })}
                    {/* Social Links */}
                    <div className="flex flex-col items-center gap-4 xl:flex-row xl:items-start">
                        {socialLinks.length > 0 &&
                            socialLinks.map((item) => {
                                return (
                                    <eleGlow
                                        Tag="Link"
                                        className="group h-12 w-12 text-sm transition-all duration-300 ease-in"
                                        href={item.url}
                                        rx="10px"
                                        offset="10px"
                                        speed="700ms"
                                        key={item.name}
                                        data-glow-animation="grow"
                                    >
                                        <Image
                                            src={`/images/icon-${item.name}.svg`}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            className="[&:is(:hover,:focus)]:fill-primary-500"
                                        ></Image>
                                    </eleGlow>
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

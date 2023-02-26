import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import Footer from "./footer";
import ButtonGlow from "../shared/button-glow";

export default function Layout({
    meta,
    children,
}: {
    meta?: {
        title?: string;
        description?: string;
        image?: string;
    };
    children: ReactNode;
}) {
    const { data: session, status } = useSession();
    const { SignInModal, setShowSignInModal } = useSignInModal();
    const scrolled = useScroll(50);

    return (
        <>
            <Meta {...meta} />
            <SignInModal />
            <div className="fixed -z-10 h-screen w-full bg-conic from-white to-primary-100" />
            <div
                className={`fixed top-0 w-full ${
                    scrolled
                        ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
                        : "bg-white/0"
                } z-30 transition-all`}
            >
                <div className="container flex h-16 items-center xl:mx-auto">
                    <Link
                        href="/"
                        className="font-display flex items-baseline px-4 text-3xl font-bold xl:pr-16  "
                    >
                        Shortly
                    </Link>
                    <nav className=" hidden w-full flex-row items-center justify-between gap-10 lg:flex">
                        <ul className="text-baseline hidden flex-row gap-10 lg:flex ">
                            <li>
                                <ButtonGlow
                                    Tag="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-300 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    href="/"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                >
                                    Features
                                </ButtonGlow>
                            </li>
                            <li>
                                <ButtonGlow
                                    Tag="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-300 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    href="/"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                >
                                    Pricing
                                </ButtonGlow>
                            </li>
                            <li>
                                <ButtonGlow
                                    Tag="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-300 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                    href="/"
                                >
                                    Resources
                                </ButtonGlow>
                            </li>
                        </ul>
                        <div>
                            <AnimatePresence>
                                {!session && status !== "loading" ? (
                                    <motion.button
                                        className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-surface-600"
                                        onClick={() => setShowSignInModal(true)}
                                        {...FADE_IN_ANIMATION_SETTINGS}
                                    >
                                        Sign In
                                    </motion.button>
                                ) : (
                                    <UserDropdown />
                                )}
                            </AnimatePresence>
                        </div>
                    </nav>
                </div>
            </div>
            <main className="flex w-full flex-col items-center justify-center gap-16 pt-32">
                {children}
            </main>
            <Footer />
        </>
    );
}

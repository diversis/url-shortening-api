import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import Footer from "./footer";
import EleGlow from "../shared/ele-glow";

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
                } z-50 transition-all`}
            >
                <div className="container mx-auto flex h-16 items-center overflow-hidden px-5">
                    <Link
                        href="/"
                        className="font-display flex items-baseline  pr-8 text-3xl font-bold xl:pr-16  "
                    >
                        Shortly
                    </Link>
                    <nav className=" hidden w-full flex-row items-center justify-between gap-10 lg:flex">
                        <ul className="text-baseline hidden flex-row gap-10 lg:flex ">
                            <li>
                                <EleGlow
                                    tagName="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-150 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    href="/"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                >
                                    Features
                                </EleGlow>
                            </li>
                            <li>
                                <EleGlow
                                    tagName="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-150 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    href="/"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                >
                                    Pricing
                                </EleGlow>
                            </li>
                            <li>
                                <EleGlow
                                    tagName="Link"
                                    className="font-display h-fit self-end text-sm text-tneutral-600 transition-all duration-150 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                    data-glow-animation="grow"
                                    rx="10px"
                                    opacity="1"
                                    speed="700ms"
                                    href="/"
                                >
                                    Resources
                                </EleGlow>
                            </li>
                        </ul>
                        <div>
                            <AnimatePresence>
                                {!session && status !== "loading" ? (
                                    <motion.button
                                        className="rounded-full border border-surface-500 bg-surface-600 p-1.5 px-5 text-sm text-white transition-all hover:bg-white hover:text-surface-600"
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
            <main className="flex w-full flex-col items-center gap-8 pt-12 xl:gap-16 xl:pt-32">
                {children}
            </main>
            <Footer />
        </>
    );
}

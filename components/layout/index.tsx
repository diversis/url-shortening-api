import {
    FADE_DOWN_ANIMATION_VARIANTS,
    FADE_IN_ANIMATION_SETTINGS,
    MENU_ITEMS,
} from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import Footer from "./footer";
import GlowWrap from "../shared/glowwrap";
import Logo from "../../public/logo.svg";
import MobileDropdown from "./mobile-dropdown";

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
            <div className="hidden xl:block">
                <SignInModal />
            </div>
            <a
                href="#main"
                className="absolute z-[9000] mx-auto -translate-y-full bg-white py-2 px-4 transition-transform focus:translate-y-0"
            >
                Skip to content
            </a>
            <div className="fixed -z-10 h-screen w-full " />
            <div className="flex flex-row justify-between">
                <div
                    className={`fixed top-0 w-full ${
                        scrolled
                            ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
                            : "bg-white/0"
                    } z-30 transition-all`}
                >
                    <div className="container mx-auto flex h-16 items-center justify-between overflow-hidden px-5">
                        <Link
                            aria-label="visit this app's main page"
                            title="Shortly Logo"
                            href="/"
                            className="font-display mr-8 flex items-baseline  fill-surface-600 text-3xl font-bold xl:mr-16  "
                        >
                            <Logo />
                        </Link>
                        {/* Desktop Navigation */}
                        <nav className=" hidden w-full flex-row items-center justify-between gap-10 xl:flex">
                            <ul className="text-baseline hidden flex-row gap-10 lg:flex ">
                                {Array.isArray(MENU_ITEMS) &&
                                    MENU_ITEMS.length > 0 &&
                                    MENU_ITEMS.map((item) => {
                                        return (
                                            <li key={"menu-" + item.name}>
                                                <GlowWrap
                                                    className="h-fit self-end text-sm"
                                                    data-glow-animation="grow"
                                                    rx="10px"
                                                    opacity="1"
                                                    speed="700ms"
                                                >
                                                    <Link
                                                        aria-label="visit this app's main page | link not yet implemented"
                                                        title={
                                                            "link placeholder: " +
                                                            item.name
                                                        }
                                                        href={item.url}
                                                        className="text-sm text-tneutral-600 transition-all duration-150 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </GlowWrap>
                                            </li>
                                        );
                                    })}
                            </ul>
                            <div>
                                <AnimatePresence>
                                    {!session && status !== "loading" ? (
                                        <GlowWrap rx="25px">
                                            <motion.button
                                                className=" rounded-full border-2 border-surface-500 p-1.5 px-5 text-sm text-surface-600 transition-all [&:is(:hover,:focus)]:border-transparent [&:is(:hover,:focus)]:bg-primary-500/50"
                                                onClick={() =>
                                                    setShowSignInModal(true)
                                                }
                                                {...FADE_IN_ANIMATION_SETTINGS}
                                                variants={
                                                    FADE_DOWN_ANIMATION_VARIANTS
                                                }
                                            >
                                                Sign In
                                            </motion.button>
                                        </GlowWrap>
                                    ) : (
                                        <UserDropdown />
                                    )}
                                </AnimatePresence>
                            </div>
                        </nav>
                    </div>
                </div>
                {/* Mobile Navigation */}
                <nav className=" fixed right-0 top-0 z-30 grid h-16  w-16  place-items-center xl:hidden">
                    <GlowWrap rx="25px">
                        <MobileDropdown />
                    </GlowWrap>
                </nav>
            </div>
            <main id="main" className="w-full pt-16 xl:pt-32">
                {children}
            </main>
            <Footer />
        </>
    );
}

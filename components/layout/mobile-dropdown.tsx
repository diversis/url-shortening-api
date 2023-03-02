import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
    FADE_DOWN_ANIMATION_VARIANTS,
    FADE_IN_ANIMATION_SETTINGS,
    MENU_ITEMS,
} from "@/lib/constants";
import Link from "next/link";
import Hamburger from "@/components/shared/icons/svg/hamburger.svg";
import GlowWrap from "../shared/glowwrap";
import { useSignInModal } from "./sign-in-modal";
import stylesDropdown from "./mobile-dropdown.module.css";

export default function MobileDropdown() {
    // setShowSignInModal: Dispatch<SetStateAction<boolean>>,
    const { data: session, status } = useSession();
    const { email, image } = session?.user || {};
    const [openPopover, setOpenPopover] = useState(false);
    const { SignInModal, setShowSignInModal } = useSignInModal();

    return (
        <>
            <SignInModal />
            <motion.div
                className=" block w-full text-left"
                {...FADE_IN_ANIMATION_SETTINGS}
                variants={FADE_DOWN_ANIMATION_VARIANTS}
            >
                <Popover
                    content={
                        <div className="mx-auto flex w-full flex-col items-center gap-8 rounded-md bg-white p-2 py-8 sm:w-56">
                            <ul className="text-baseline flex flex-col items-center  gap-8">
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
                                                        href={item.url}
                                                        className="w-min text-center text-sm text-tneutral-600 transition-all duration-150 ease-in [&:is(:hover,:focus)]:text-surface-600"
                                                    >
                                                        {item.name}
                                                    </Link>
                                                </GlowWrap>
                                            </li>
                                        );
                                    })}
                            </ul>

                            <AnimatePresence>
                                {!session && status !== "loading" && (
                                    <GlowWrap rx="25px">
                                        <motion.button
                                            className="rounded-full border-2 border-surface-500 p-1.5 px-12 text-sm text-surface-600 transition-all [&:is(:hover,:focus)]:border-transparent [&:is(:hover,:focus)]:bg-primary-500/50"
                                            onClick={() => {
                                                setOpenPopover(!openPopover);
                                                setShowSignInModal(true);
                                            }}
                                            {...FADE_IN_ANIMATION_SETTINGS}
                                            variants={
                                                FADE_DOWN_ANIMATION_VARIANTS
                                            }
                                        >
                                            Sign In
                                        </motion.button>
                                    </GlowWrap>
                                )}
                            </AnimatePresence>

                            {!!session && (
                                <div className="flex flex-row items-center">
                                    <div className="pointer-events-none h-8 w-8 justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none sm:h-9 sm:w-9">
                                        <Image
                                            alt={email || "avatar"}
                                            src={
                                                image ||
                                                `https://avatars.dicebear.com/api/micah/${email}.svg`
                                            }
                                            width={40}
                                            height={40}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <GlowWrap
                                            rx="10px"
                                            opacity="1"
                                            speed="700ms"
                                        >
                                            <Link
                                                className=" relative flex w-min  items-center justify-start space-x-2 rounded-md p-2 px-6 text-center text-sm transition-all duration-75 hover:bg-gray-100 [&:is(:hover,:focus)]:underline"
                                                href="/dashboard"
                                            >
                                                <LayoutDashboard className="h-4 w-4" />
                                                <p className="text-sm">
                                                    Dashboard
                                                </p>
                                            </Link>
                                        </GlowWrap>
                                        <GlowWrap
                                            rx="10px"
                                            opacity="1"
                                            speed="700ms"
                                        >
                                            <button
                                                className="relative flex   w-min items-center justify-start space-x-2 rounded-md p-2 px-6 text-center text-sm transition-all duration-75 hover:bg-gray-100 [&:is(:hover,:focus)]:underline"
                                                onClick={() =>
                                                    signOut({
                                                        redirect: true,
                                                        callbackUrl: "/",
                                                    })
                                                }
                                            >
                                                <LogOut className="h-4 w-4" />
                                                <p className="text-sm">
                                                    Logout
                                                </p>
                                            </button>
                                        </GlowWrap>
                                    </div>
                                </div>
                            )}
                        </div>
                    }
                    align="end"
                    openPopover={openPopover}
                    setOpenPopover={setOpenPopover}
                >
                    <button
                        onClick={() => setOpenPopover(!openPopover)}
                        className={
                            stylesDropdown["mobile-nav-toggle"] +
                            " " +
                            "flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
                        }
                    >
                        <span className="sr-only">Menu</span>
                        <Hamburger />
                    </button>
                </Popover>
            </motion.div>
        </>
    );
}

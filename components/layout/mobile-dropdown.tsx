import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { LayoutDashboard, LogOut } from "lucide-react";
import Popover from "@/components/shared/popover";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
    FADE_DOWN_ANIMATION_VARIANTS,
    FADE_IN_ANIMATION_SETTINGS,
} from "@/lib/constants";
import Link from "next/link";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import GlowWrap from "../shared/glowwrap";

export default function MobileDropdown() {
    const { data: session, status } = useSession();
    const { email, image } = session?.user || {};
    const [openPopover, setOpenPopover] = useState(false);
    const { SignInModal, setShowSignInModal } = useSignInModal();

    return (
        <motion.div
            className="relative block w-full text-left"
            {...FADE_IN_ANIMATION_SETTINGS}
            variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
            <Popover
                content={
                    <div className="flex w-full flex-col items-center gap-4 rounded-md bg-white p-2 sm:w-56">
                        <AnimatePresence>
                            {!session && status !== "loading" ? (
                                <GlowWrap rx="25px">
                                    <motion.button
                                        className="rounded-full border-2 border-surface-500 p-1.5 px-5 text-sm text-surface-600 transition-all [&:is(:hover,:focus)]:border-transparent [&:is(:hover,:focus)]:bg-primary-500/50"
                                        onClick={() => setShowSignInModal(true)}
                                        {...FADE_IN_ANIMATION_SETTINGS}
                                        variants={FADE_DOWN_ANIMATION_VARIANTS}
                                    >
                                        Sign In
                                    </motion.button>
                                </GlowWrap>
                            ) : (
                                <UserDropdown />
                            )}
                        </AnimatePresence>

                        {!!session && (
                            <>
                                <Link
                                    className="relative flex items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 [&:is(:hover,:focus)]:underline"
                                    href="/dashboard"
                                >
                                    <LayoutDashboard className="h-4 w-4" />
                                    <p className="text-sm">Dashboard</p>
                                </Link>

                                <button
                                    className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 [&:is(:hover,:focus)]:underline"
                                    onClick={() =>
                                        signOut({
                                            redirect: true,
                                            callbackUrl: "/",
                                        })
                                    }
                                >
                                    <LogOut className="h-4 w-4" />
                                    <p className="text-sm">Logout</p>
                                </button>
                            </>
                        )}
                    </div>
                }
                align="end"
                openPopover={openPopover}
                setOpenPopover={setOpenPopover}
            >
                <button
                    onClick={() => setOpenPopover(!openPopover)}
                    className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
                >
                    <Image
                        alt={email || "avatar"}
                        src={
                            image ||
                            `https://avatars.dicebear.com/api/micah/${email}.svg`
                        }
                        width={40}
                        height={40}
                    />
                </button>
            </Popover>
        </motion.div>
    );
}

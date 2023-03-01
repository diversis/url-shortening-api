import Modal from "@/components/shared/modal";
import { signIn } from "next-auth/react";
import {
    useState,
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
} from "react";
import { LoadingDots, Google } from "@/components/shared/icons";
import Image from "next/image";
import Github from "@/components/shared/icons/svg/icon-github.svg";
import Vk from "@/components/shared/icons/svg/icon-vk.svg";
import Yandex from "@/components/shared/icons/svg/icon-yandex.svg";

const SignInModal = ({
    showSignInModal,
    setShowSignInModal,
}: {
    showSignInModal: boolean;
    setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}) => {
    const [signInClicked, setSignInClicked] = useState(false);

    return (
        <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
            <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
                    <a href="https://precedent.dev">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            className="h-10 w-10 rounded-full"
                            width={20}
                            height={20}
                        />
                    </a>
                    <h3 className="font-display text-2xl font-bold">Sign In</h3>
                    <p className="text-sm text-gray-500">
                        This is strictly for demo purposes - only your email and
                        profile picture will be stored.
                    </p>
                </div>

                <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-tneutral-500/50 bg-tneutral-600/50"
                                : "border border-tneutral-500 bg-white text-surface-600 hover:bg-primary-500/25"
                        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("github");
                        }}
                    >
                        {signInClicked ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <>
                                <Google className="h-5 w-5" />
                                <p>Sign In with Google</p>
                            </>
                        )}
                    </button>
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-tneutral-500/50 bg-tneutral-600/50"
                                : "border border-tneutral-500 bg-white text-surface-600 hover:bg-primary-500/25"
                        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("github");
                        }}
                    >
                        {signInClicked ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <>
                                <Github className="h-5 w-5" />
                                <p>Sign In with Github</p>
                            </>
                        )}
                    </button>
                    {/* <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-tneutral-500/50 bg-tneutral-600/50"
                                : "border border-tneutral-500 bg-white text-surface-600 hover:bg-primary-500/25"
                        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("vk");
                        }}
                    >
                        {signInClicked ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <>
                                <Vk className="h-5 w-5" />
                                <p>Sign In with VK</p>
                            </>
                        )}
                    </button>
                    <button
                        disabled={signInClicked}
                        className={`${
                            signInClicked
                                ? "cursor-not-allowed border-tneutral-500/50 bg-tneutral-600/50"
                                : "border border-tneutral-500 bg-white text-surface-600 hover:bg-primary-500/25"
                        } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`}
                        onClick={() => {
                            setSignInClicked(true);
                            signIn("yandex");
                        }}
                    >
                        {signInClicked ? (
                            <LoadingDots color="#808080" />
                        ) : (
                            <>
                                <Yandex className="h-5 w-5" />
                                <p>Sign In with Yandex</p>
                            </>
                        )}
                    </button> */}
                </div>
            </div>
        </Modal>
    );
};

export function useSignInModal() {
    const [showSignInModal, setShowSignInModal] = useState(false);

    const SignInModalCallback = useCallback(() => {
        return (
            <SignInModal
                showSignInModal={showSignInModal}
                setShowSignInModal={setShowSignInModal}
            />
        );
    }, [showSignInModal, setShowSignInModal]);

    return useMemo(
        () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
        [setShowSignInModal, SignInModalCallback],
    );
}

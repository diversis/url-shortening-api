export const FADE_IN_ANIMATION_SETTINGS = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
};

export const FADE_DOWN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: -10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const FADE_UP_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" } },
};

export const DEPLOY_URL = "https://url-shortening-api-nine.vercel.app/";

export const MENU_ITEMS = [
    { name: "Features", url: "/" },
    { name: "Pricing", url: "/" },
    { name: "Resources", url: "/" },
];

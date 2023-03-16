import { toast } from "react-toastify";
export const handleCopy = ({
    e,
    timeout,
    onCooldown,
    textToCopy,
}: {
    e: React.MouseEvent<HTMLElement>;
    timeout: NodeJS.Timeout;
    onCooldown: boolean;
    textToCopy: string;
}) => {
    clearTimeout(timeout);
    navigator.clipboard.writeText(textToCopy);
    const target = e.target as HTMLButtonElement;
    target.setAttribute("data-copium", "true");

    timeout = setTimeout(() => {
        target.setAttribute("data-copium", "false");

        onCooldown = false;
    }, 3000);

    if (!onCooldown) {
        onCooldown = true;
        toast.success("Copium!", {
            autoClose: 1500,
        });
    }
};

import { useEffect } from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { AnimatePresence } from "framer-motion";

export default function Toast() {
    useEffect(() => {
        console.log("TOAAAAST");
    }, []);

    return (
        <>
            <ToastPrimitive.Provider>
                <ToastPrimitive.Root className="ToastPrimitiveRoot">
                    <ToastPrimitive.Title className="ToastPrimitiveTitle">
                        Scheduled: Catch up
                    </ToastPrimitive.Title>
                    <ToastPrimitive.Description asChild>
                        Description
                    </ToastPrimitive.Description>
                    <ToastPrimitive.Action
                        className="ToastPrimitiveAction"
                        asChild
                        altText="Goto schedule to undo"
                    >
                        <button className="bg-primary-500">Undo</button>
                    </ToastPrimitive.Action>
                </ToastPrimitive.Root>
                <ToastPrimitive.Viewport className="ToastPrimitiveViewport" />
            </ToastPrimitive.Provider>
        </>
    );
}

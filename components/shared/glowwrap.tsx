import styles from "./glowwrap.module.css";
import { useCallback, useEffect, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

export default function GlowWrap({
    children,
    rx = "0px",
    speed = "1200ms",
    offset = "0px",
    blur = "5px",
    thickness = "2px",
    length = "20px",
    className = "",
    opacity = "0",
    lineColor = "stroke-primary-500",
    blurColor = "stroke-primary-500",
    ...props
}: // log = false,
{
    children?: React.ReactNode | React.ReactNode[];

    rx?: string;
    speed?: string;
    offset?: string;
    blur?: string;
    thickness?: string;
    length?: string;
    className?: string;
    opacity?: string;
    lineColor?: string;
    blurColor?: string;
    props?: any;
    // log?: boolean;
}) {
    let [render, setRender] = useState(false);
    // const Tag = tagName as keyof JSX.IntrinsicElements;
    const onResize = useCallback(() => {
        // if (log) {
        //     console.log("resized! " + width);
        // }
        setRender(false);
        setTimeout(() => setRender(true));
    }, []);

    const { width, height, ref } = useResizeDetector({
        handleHeight: false,
        refreshMode: "debounce",
        refreshRate: 1000,
        onResize,
    });

    useEffect(() => setRender(true), []);
    return (
        <>
            <div
                ref={ref}
                className={styles["glow-effect"] + " " + className}
                style={
                    {
                        ["--animation-speed"]: speed,
                        ["--glow-offset"]: offset,
                        ["--glow-blur-size"]: blur,
                        ["--glow-line-thickness"]: thickness,
                        ["--glow-line-length"]: length,
                        ["--final-opacity"]: opacity,
                    } as React.CSSProperties
                }
                {...props}
            >
                {children}

                {render && (
                    <svg className={styles["glow-container"]}>
                        <rect
                            pathLength="100"
                            className={styles["glow-blur"] + " " + blurColor}
                            rx={rx}
                            width="100"
                            height="100"
                        ></rect>
                        <rect
                            pathLength="100"
                            className={styles["glow-line"] + " " + lineColor}
                            rx={rx}
                            width="100"
                            height="100"
                        ></rect>
                    </svg>
                )}
            </div>
        </>
    );
}

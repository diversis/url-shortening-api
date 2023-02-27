import styles from "./ele-glow.module.css";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useResizeDetector } from "react-resize-detector";

export default function EleGlow({
    children,
    Tag = "button",
    rx = "0px",
    speed = "1200ms",
    offset = "0px",
    blur = "5px",
    thickness = "2px",
    length = "20px",
    className = "",
    onClick,
    unwrap = false,
    opacity = "0",
    href = "#",
    ...props
}: {
    children?: React.ReactNode;
    Tag?: string;
    rx?: string;
    speed?: string;
    offset?: string;
    blur?: string;
    thickness?: string;
    length?: string;
    className?: string;
    opacity?: string;
    href?: string;
    onClick?: () => void;
    unwrap?: boolean;
    props?: any;
}) {
    let isLink = Tag === "Link";
    let [render, setRender] = useState(true);
    const onResize = useCallback(() => {
        setRender(false);
        setTimeout(() => setRender(true), 0);
    }, []);

    const { width, height, ref } = useResizeDetector({
        handleHeight: false,
        refreshMode: "debounce",
        refreshRate: 1000,
        onResize,
    });
    return (
        <>
            {isLink && (
                <Link
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
                    href={href}
                    {...props}
                >
                    {render && (
                        <svg className={styles["glow-container"]}>
                            <rect
                                pathLength="100"
                                stroke-linecap="round"
                                className={styles["glow-blur"]}
                                rx={rx}
                            ></rect>
                            <rect
                                pathLength="100"
                                stroke-linecap="round"
                                className={styles["glow-line"]}
                                rx={rx}
                            ></rect>
                        </svg>
                    )}
                    {children}
                </Link>
            )}

            {!unwrap && !isLink && (
                <Tag
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
                    {render && (
                        <svg className={styles["glow-container"]}>
                            <rect
                                pathLength="100"
                                stroke-linecap="round"
                                className={styles["glow-blur"]}
                                rx={rx}
                            ></rect>
                            <rect
                                pathLength="100"
                                stroke-linecap="round"
                                className={styles["glow-line"]}
                                rx={rx}
                            ></rect>
                        </svg>
                    )}

                    {children}
                </Tag>
            )}
        </>
    );
}

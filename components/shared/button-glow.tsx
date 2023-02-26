import styles from "./button-glow.module.css";
import Link from "next/link";

export default function ButtonGlow({
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
}) {
  let isLink = Tag === "Link";
  return (
    <>
      {isLink && (
        <Link
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
          {children}
        </Link>
      )}

      {!unwrap && !isLink && (
        <Tag
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
          {children}
        </Tag>
      )}
    </>
  );
}

import styles from "./button-glow.module.css";

export default function ButtonGlow({
  children,
  rx = "0px",
  speed = "1200ms",
  offset = "0px",
  blur = "5px",
  thickness = "2px",
  length = "20px",
  className = "",
  onClick,
  ...props
}: {
  children?: React.ReactNode;
  rx?: string;
  speed?: string;
  offset?: string;
  blur?: string;
  thickness?: string;
  length?: string;
  className?: string;
  onClick?: () => void;
  props?: any[];
}) {
  return (
    <button
      className={styles["glow-effect"] + " " + className}
      style={
        {
          ["--animation-speed"]: speed,
          ["--glow-offset"]: offset,
          ["--glow-blur-size"]: blur,
          ["--glow-line-thickness"]: thickness,
          ["--glow-line-length"]: length,
        } as React.CSSProperties
      }
      {...props}
    >
      <svg className={styles["glow-container"]}>
        <rect
          pathLength="100"
          stroke-linecap="round"
          className={styles["glow-blur"]}
        ></rect>
        <rect
          pathLength="100"
          stroke-linecap="round"
          className={styles["glow-line"]}
          rx={rx}
        ></rect>
      </svg>
      {children}
    </button>
  );
}

export default function ButtonGlow(rx,) {
  return (
    <>
      <svg className="glow-container">
        <rect
          pathLength="100"
          stroke-linecap="round"
          className="glow-blur"
        ></rect>
        <rect
          pathLength="100"
          stroke-linecap="round"
          className="glow-line"
          rx={rx}
        ></rect>
      </svg>
    </>
  );
}

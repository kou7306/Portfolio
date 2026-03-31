import "./loading.css";

export default function Loading() {
  return (
    <div className="flex" aria-label="読み込み中">
      <div className="animate-spin load h-50 w-50 border-4 rounded-full border-t-transparent"></div>
      <span style={{
        fontFamily: "var(--font-orbitron), ui-monospace, system-ui, sans-serif",
        fontSize: "10px",
        letterSpacing: "0.2em",
        color: "rgba(92, 225, 255, 0.5)",
        textTransform: "uppercase",
      }}>
        Now Loading...
      </span>
    </div>
  );
}

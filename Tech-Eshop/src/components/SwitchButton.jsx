export default function SwitchButton({ enabled, setEnabled }) {
  return (
    <button
      role="switch"
      type="button"
      aria-checked={enabled}
      onClick={() => setEnabled(!enabled)}
      className={`
        relative inline-flex h-4.5 w-9 items-center rounded-lg
        focus:outline-none 
        transition-colors duration-200 cursor-pointer
        
        ${enabled ? "bg-(--deepBlue)" : "bg-(--deepBlue)/50"}
      `}
    >
      <span
        className={`
          inline-block h-3.5 w-3.5 transform rounded-full bg-white
          transition-transform duration-200
          ${enabled ? "translate-x-4.5" : "translate-x-1"}
        `}
      />
    </button>
  );
}

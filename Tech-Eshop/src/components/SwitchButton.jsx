export default function SwitchButton({ enabled, setEnabled }) {
  return (
    <button
      role="switch"
      type="button"
      aria-checked={enabled}
      onClick={() =>  setEnabled(!enabled)}
      className={`
        relative inline-flex h-4.5 w-8 items-center rounded-xl
        focus:outline-none 
        transition-colors duration-200
        
        ${enabled ? "bg-stone-900" : "bg-gray-300"}
      `}
    >
      <span
        className={`
          inline-block h-4 w-4 transform rounded-full bg-white
          transition-transform duration-200
          ${enabled ? "translate-x-3.5" : "translate-x-0.5"}
        `}
      />
    </button>
  );
}

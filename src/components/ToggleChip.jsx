export default function ToggleChip({ label, hint, checked, onChange }) {
  return (
    <button
      className={`toggle-chip ${checked ? 'toggle-chip--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="chip-label"># {label}</span>
      {checked && hint && <span className="chip-hint">// {hint}</span>}
    </button>
  )
}
export default function SelectField({ label, value, options, onChange }) {
  return (
    <div className="select-field">
      <label className="field-label">{label}</label>
      <select
        className="field-select"
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}
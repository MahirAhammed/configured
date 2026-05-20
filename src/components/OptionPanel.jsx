export default function OptionPanel({ children }) {
  return (
    <div className="option-panel">
      {children}
    </div>
  )
}

// A section with a title inside the panel
export function OptionSection({ title, children }) {
  return (
    <div className="option-section">
      {title && <h3 className="option-section-title">{title}</h3>}
      {children}
    </div>
  )
}
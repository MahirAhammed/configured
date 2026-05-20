export default function PreviewPane({ content, format, onChange, formatOptions}) {
  
  const activeLabel = formatOptions.find(f => f.value === format)?.label ?? format

  function copyToClipboard() {
    navigator.clipboard.writeText(content);
  }

  return (
    <div className="preview-pane">
      <div className="preview-header">
        <span className="preview-filename">{activeLabel}</span>

        <div className="preview-actions">
          <div className="format-toggle">
             {formatOptions.map(opt => (
              <button
                key={opt.value}
                className={`fmt-btn ${format === opt.value ? 'fmt-btn--active' : ''}`}
                onClick={() => onChange('format', opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button className="copy-btn" onClick={copyToClipboard}>
            copy
          </button>
        </div>
      </div>

      {/* Config output -> pre preserves whitespace and indentation */}
      <pre className="preview-code">{content}</pre>
    </div>
  );
}

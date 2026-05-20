import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import OptionPanel, { OptionSection } from "../components/OptionPanel";
import SelectField from "../components/SelectField";
import ToggleChip from "../components/ToggleChip";
import PreviewPane from "../components/PreviewPane";
import DownloadButton from "../components/DownloadButton";
import { generateFastapi } from "../generators/fastApiGenerator";
import {
  DATABASE_OPTIONS,
  TOGGLE_OPTIONS,
  DEFAULT_SELECTIONS,
} from "../data/fastApiOptions";

export default function FastApiPage() {
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS);

  function handleChange(key, value) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  // Rerun generator only when selections change,
  const generated = useMemo(() => generateFastapi(selections), [selections]);
  const activeContent = selections.format === "env" ? generated.env : generated.config;

  return (
    <div className="generator-page">
      <div className="generator-header">
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="generator-title-row">
          <img
            src="/logos/fastapi.svg"
            alt="FastAPI"
            className="generator-logo"
          />
          <h1 className="generator-title">FastAPI</h1>
        </div>
        <p className="generator-subtitle">
          Config file <code>config.py</code> and{" "}
          <code>.env</code> setup
        </p>
      </div>

      <div className="generator-body">
        <OptionPanel>
          <OptionSection title="Database">
            <SelectField
              label="Database"
              value={selections.database}
              options={DATABASE_OPTIONS}
              onChange={(val) => handleChange("database", val)}
            />
          </OptionSection>

          <OptionSection title="Options">
            <div className="chip-grid">
              {TOGGLE_OPTIONS.map((opt) => (
                <ToggleChip
                  key={opt.id}
                  label={opt.label}
                  hint={opt.hint}
                  checked={selections[opt.id]}
                  onChange={(val) => handleChange(opt.id, val)}
                />
              ))}
            </div>
          </OptionSection>

        </OptionPanel>

        <div className="preview-column">
          <PreviewPane
            content={activeContent}
            format={selections.format}
            onChange={handleChange}
            formatOptions={[
              { value: "env", label: ".env" },
              { value: "config", label: "config.py" },
            ]}
          />
          <DownloadButton
            files={[
              {
                filename:
                  selections.format === "env"
                    ? ".env"
                    : "config.py",
                content: activeContent,
              },
            ]}
            filename="config.zip"
          />
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import OptionPanel, { OptionSection } from "../components/OptionPanel";
import SelectField from "../components/SelectField";
import ToggleChip from "../components/ToggleChip";
import PreviewPane from "../components/PreviewPane";
import DownloadButton from "../components/DownloadButton";
import { generateSpring } from "../generators/springGenerator";
import {
  DATABASE_OPTIONS,
  DDL_AUTO_OPTIONS,
  LOG_LEVEL_OPTIONS,
  TOGGLE_OPTIONS,
  DEFAULT_SELECTIONS,
} from "../data/springOptions";

export default function SpringPage() {
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS);

  function handleChange(key, value) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  // Rerun generator only when selections change,
  const generated = useMemo(() => generateSpring(selections), [selections]);
  const activeContent =
    selections.format === "yml" ? generated.yml : generated.properties;

  return (
    <div className="generator-page">
      <div className="generator-header">
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="generator-title-row">
          <img
            src="/logos/spring.svg"
            alt="Spring Boot"
            className="generator-logo"
          />
          <h1 className="generator-title">Spring Boot</h1>
        </div>
        <p className="generator-subtitle">
          Configuration for <code>application.properties</code> or{" "}
          <code>application.yml</code>
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

          {selections.jpa && selections.database !== "mongodb" && (
            <OptionSection title="JPA settings">
              <SelectField
                label="ddl-auto"
                value={selections.ddlAuto}
                options={DDL_AUTO_OPTIONS}
                onChange={(val) => handleChange("ddlAuto", val)}
              />
            </OptionSection>
          )}

          {selections.logging && (
            <OptionSection title="Logging settings">
              <SelectField
                label="Log level"
                value={selections.logLevel}
                options={LOG_LEVEL_OPTIONS}
                onChange={(val) => handleChange("logLevel", val)}
              />
            </OptionSection>
          )}
        </OptionPanel>

        <div className="preview-column">
          <PreviewPane
            content={activeContent}
            format={selections.format}
            onChange={handleChange}
            formatOptions={[
              { value: "properties", label: ".properties" },
              { value: "yml", label: ".yml" },
            ]}
          />
          <DownloadButton
            files={[
              {
                filename:
                  selections.format === "yml"
                    ? "application.yml"
                    : "application.properties",
                content: activeContent,
              },
            ]}
            filename="spring-config.zip"
          />
        </div>
      </div>
    </div>
  );
}

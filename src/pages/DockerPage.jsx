import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import OptionPanel, { OptionSection } from "../components/OptionPanel";
import SelectField from "../components/SelectField";
import ToggleChip from "../components/ToggleChip";
import PreviewPane from "../components/PreviewPane";
import DownloadButton from "../components/DownloadButton";
import { generateDocker } from "../generators/dockerGenerator";
import {
  APP_OPTIONS,
  DATABASE_OPTIONS,
  RESTART_OPTIONS,
  TOGGLE_OPTIONS,
  DEFAULT_SELECTIONS,
} from "../data/dockerOptions";

const FORMAT_OPTIONS = [
  { value: "compose", label: "docker-compose.yml" },
  { value: "dockerfile", label: "Dockerfile" },
  { value: "dockerignore", label: ".dockerignore" },
];

export default function DockerPage() {
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS);

  function handleChange(key, value) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  const generated = useMemo(() => generateDocker(selections), [selections]);

  const activeContent =
    selections.format === "dockerfile"
      ? generated.dockerfile
      : selections.format === "dockerignore"
        ? generated.dockerignore
        : generated.compose;

  const availableFormats = FORMAT_OPTIONS.filter((f) => {
    if (f.value === "compose") return true;
    if (f.value === "dockerfile") return selections.dockerfile;
    if (f.value === "dockerignore") return selections.dockerignore;
    return true;
  });

  // If a format tab is disabled, fall back to compose
  const safeFormat = availableFormats.find((f) => f.value === selections.format)
    ? selections.format
    : "compose";

  const downloadFiles = [
    { filename: "docker-compose.yml", content: generated.compose },
    generated.dockerfile && {
      filename: "Dockerfile",
      content: generated.dockerfile,
    },
    generated.dockerignore && {
      filename: ".dockerignore",
      content: generated.dockerignore,
    },
  ].filter(Boolean);

  return (
    <div className="generator-page">
      <div className="generator-header">
        <Link to="/" className="back-link">
          ← Back
        </Link>
        <div className="generator-title-row">
          <img
            src="/logos/docker.svg"
            alt="Docker"
            className="generator-logo"
          />
          <h1 className="generator-title">Docker</h1>
        </div>
        <p className="generator-subtitle">
          Generate <code>docker-compose.yml</code>, <code>Dockerfile</code> and{" "}
          <code>.dockerignore</code>
        </p>
      </div>

      <div className="generator-body">
        <OptionPanel>
          <OptionSection title="App">
            <div className="edit-field">
              <label className="field-label">App name</label>
              <input
                className="field-input"
                type="text"
                value={selections.appName}
                onChange={(e) => handleChange("appName", e.target.value)}
                placeholder="myapp"
                spellCheck={false}
              />
            </div>
            <SelectField
              label="Framework"
              value={selections.app}
              options={APP_OPTIONS}
              onChange={(val) => handleChange("app", val)}
            />
          </OptionSection>

          <OptionSection title="Database">
            <SelectField
              label="Database"
              value={selections.database}
              options={DATABASE_OPTIONS}
              onChange={(val) => handleChange("database", val)}
            />
          </OptionSection>

          <OptionSection title="Config">
            <SelectField
              label="Restart policy"
              value={selections.restart}
              options={RESTART_OPTIONS}
              onChange={(val) => handleChange("restart", val)}
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
            content={
              activeContent ??
              "# This file is not enabled — toggle it in options"
            }
            format={safeFormat}
            onChange={handleChange}
            formatOptions={availableFormats}
          />
          <DownloadButton files={downloadFiles} zipName="docker-config.zip" />
        </div>
      </div>
    </div>
  );
}

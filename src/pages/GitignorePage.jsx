import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OptionPanel, { OptionSection } from '../components/OptionPanel'
import ToggleChip from '../components/ToggleChip'
import PreviewPane from '../components/PreviewPane'
import DownloadButton from '../components/DownloadButton'
import { generateGitignore } from '../generators/gitignoreGenerator'
import {
  LANGUAGE_OPTIONS,
  FRAMEWORK_OPTIONS,
  IDE_OPTIONS,
  SYSTEM_OPTIONS,
  EXTRA_OPTIONS,
  DEFAULT_SELECTIONS,
} from '../data/gitignoreOptions'

const FORMAT_OPTIONS = [{ value: 'gitignore', label: '.gitignore' }]

export default function GitignorePage() {
  const [selections, setSelections] = useState(DEFAULT_SELECTIONS)

  function handleChange(key, value) {
    setSelections(prev => ({ ...prev, [key]: value }))
  }

  const generated = useMemo(() => generateGitignore(selections), [selections])

  function ChipGroup({ options }) {
    return (
      <div className="chip-grid">
        {options.map(opt => (
          <ToggleChip
            key={opt.id}
            label={opt.label}
            checked={selections[opt.id]}
            onChange={val => handleChange(opt.id, val)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="generator-page">

      <div className="generator-header">
        <Link to="/" className="back-link">← back</Link>
        <div className="generator-title-row">
          <img src="/logos/git.svg" alt="Git" className="generator-logo" />
          <h1 className="generator-title">.gitignore</h1>
        </div>
        <p className="generator-subtitle">
          Generate a merged <code>.gitignore</code> for your stack
        </p>
      </div>

      <div className="generator-body">

        <OptionPanel>

          <OptionSection title="Languages">
            <ChipGroup options={LANGUAGE_OPTIONS} />
          </OptionSection>

          <OptionSection title="Frameworks">
            <ChipGroup options={FRAMEWORK_OPTIONS} />
          </OptionSection>

          <OptionSection title="IDE">
            <ChipGroup options={IDE_OPTIONS} />
          </OptionSection>

          <OptionSection title="Operating system">
            <ChipGroup options={SYSTEM_OPTIONS} />
          </OptionSection>

          <OptionSection title="Extras">
            <ChipGroup options={EXTRA_OPTIONS} />
          </OptionSection>

        </OptionPanel>

        <div className="preview-column">
          <PreviewPane
            content={generated}
            format="gitignore"
            onChange={handleChange}
            formatOptions={FORMAT_OPTIONS}
          />
          <DownloadButton
            files={[{ filename: '.gitignore', content: generated }]}
            zipName="gitignore.zip"
          />
        </div>

      </div>
    </div>
  )
}
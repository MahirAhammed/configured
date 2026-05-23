import { downloadZip } from "../generators/zipBuilder";

export default function DownloadButton({ files, filename = "config.zip" }) {
  async function handleDownload() {
    await downloadZip(files, filename);
  }

  return (
    <button className="download-btn" onClick={handleDownload}>
      Download {files.length > 1 ? filename : files[0]?.filename}
    </button>
  );
}

import JSZip from 'jszip'

export async function downloadZip(files, zipName = 'config.zip') {
  const zip = new JSZip()
  files.forEach(({ filename, content }) => zip.file(filename, content))
  const blob = await zip.generateAsync({ type: 'blob' })

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = zipName
  a.click()
  URL.revokeObjectURL(url)
}
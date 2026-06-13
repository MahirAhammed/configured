export const LANGUAGE_OPTIONS = [
  { id: "java", label: "Java" },
  { id: "python", label: "Python" },
  { id: "node", label: "Node.js" },
  { id: "typescript", label: "TypeScript" },
  { id: "dart", label: "Dart" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "csharp", label: "C#" },
];

export const FRAMEWORK_OPTIONS = [
  { id: "spring", label: "Spring Boot" },
  { id: "nextjs", label: "Next.js" },
  { id: "react", label: "React" },
  { id: "django", label: "Django" },
  { id: "fastapi", label: "FastAPI" },
  { id: "flutter", label: "Flutter" },
];

export const IDE_OPTIONS = [
  { id: "idea", label: "IntelliJ IDEA" },
  { id: "vscode", label: "VS Code" },
  { id: "eclipse", label: "Eclipse" },
  { id: "vim", label: "Vim / Neovim" },
];

export const SYSTEM_OPTIONS = [
  { id: "macos", label: "macOS" },
  { id: "windows", label: "Windows" },
  { id: "linux", label: "Linux" },
];

export const EXTRA_OPTIONS = [
  { id: "docker", label: "Docker" },
  { id: "envs", label: ".env files" },
  { id: "logs", label: "Logs" },
  { id: "coverage", label: "Coverage" },
];

export const DEFAULT_SELECTIONS = {
  java: false,
  python: false,
  node: false,
  typescript: false,
  dart: false,
  go: false,
  rust: false,
  csharp: false,
  spring: false,
  nextjs: false,
  react: false,
  django: false,
  fastapi: false,
  flutter: false,
  idea: false,
  vscode: false,
  eclipse: false,
  vim: false,
  macos: false,
  windows: false,
  linux: false,
  docker: false,
  envs: true,
  logs: true,
  coverage: false,
  format: "gitignore",
};

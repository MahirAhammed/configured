export const APP_OPTIONS = [
  { value: "spring", label: "Spring Boot (Java)" },
  { value: "fastapi", label: "FastAPI (Python)" },
  { value: "django", label: "Django (Python)" },
  { value: "express", label: "Express (Node)" },
];

export const DATABASE_OPTIONS = [
  { value: "none", label: "None" },
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
];

export const RESTART_OPTIONS = [
  { value: "unless-stopped", label: "unless-stopped" },
  { value: "always", label: "always" },
  { value: "on-failure", label: "on-failure" },
  { value: "no", label: "no" },
];

export const TOGGLE_OPTIONS = [
  { id: "redis", label: "Redis service", hint: "Adds a Redis container" },
  {
    id: "healthcheck",
    label: "Healthcheck",
    hint: "curl healthcheck on app container",
  },
  { id: "volumes", label: "Named volumes", hint: "Persists database data" },
  {
    id: "network",
    label: "Custom network",
    hint: "Isolates services on one network",
  },
  { id: "envFile", label: ".env file", hint: "Adds env_file reference to app" },
  {
    id: "dockerfile",
    label: "Dockerfile",
    hint: "Generates a matching Dockerfile",
  },
  {
    id: "dockerignore",
    label: ".dockerignore",
    hint: "Generates a matching .dockerignore",
  },
];

export const DEFAULT_SELECTIONS = {
  appName: "myapp",
  app: "spring",
  database: "postgres",
  restart: "unless-stopped",
  format: "compose",
  redis: false,
  healthcheck: false,
  volumes: true,
  network: true,
  envFile: false,
  dockerfile: true,
  dockerignore: true,
};

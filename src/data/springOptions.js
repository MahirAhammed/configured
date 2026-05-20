export const DATABASE_OPTIONS = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "mongodb", label: "MongoDB" },
  { value: "h2", label: "H2 (in-memory)" },
];

export const DDL_AUTO_OPTIONS = [
  { value: "validate", label: "validate" },
  { value: "update", label: "update" },
  { value: "create", label: "create" },
  { value: "create-drop", label: "create-drop" },
  { value: "none", label: "none" },
];

export const LOG_LEVEL_OPTIONS = [
  { value: "INFO", label: "INFO" },
  { value: "DEBUG", label: "DEBUG" },
  { value: "WARN", label: "WARN" },
  { value: "ERROR", label: "ERROR" },
];

export const TOGGLE_OPTIONS = [
  {
    id: "pool",
    label: "HikariCP pool",
    hint: "Connection pool sizing and timeout settings",
  },
  {
    id: "jpa",
    label: "JPA / Hibernate",
    hint: "ddl-auto, show-sql, dialect",
  },
  {
    id: "flyway",
    label: "Flyway migrations",
    hint: "Enables Flyway with sensible defaults",
  },
  {
    id: "logging",
    label: "Logging",
    hint: "Log level and optional file output",
  },
  {
    id: "redis",
    label: "Redis cache",
    hint: "spring.data.redis connection + cache type",
  },
  {
    id: "mail",
    label: "Mail (SMTP)",
    hint: "spring.mail host, port, credentials",
  },
  {
    id: "actuator",
    label: "Actuator",
    hint: "Exposes /actuator health and info endpoints",
  },
  {
    id: "apiKey",
    label: "API key property",
    hint: "Placeholder for app.api-key property",
  },
  {
    id: "serverPort",
    label: "Server port",
    hint: "Explicit server.port (default is 8080)",
  },
];

// Default state
export const DEFAULT_SELECTIONS = {
  database: "postgres",
  format: "properties",
  pool: false,
  jpa: false,
  flyway: false,
  logging: false,
  redis: false,
  mail: false,
  actuator: false,
  apiKey: false,
  serverPort: false,
  ddlAuto: "validate",
  logLevel: "INFO",
};

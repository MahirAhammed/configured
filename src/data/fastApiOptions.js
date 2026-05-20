export const DATABASE_OPTIONS = [
  { value: "postgres", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "mongodb", label: "MongoDB" },
];

export const TOGGLE_OPTIONS = [
  {
    id: "pool",
    label: "Connection pool",
    hint: "pool_size, max_overflow, pool_timeout",
  },
  { id: "cors", label: "CORS", hint: "allowed origins list" },
  { id: "jwt", label: "JWT", hint: "secret key, algorithm, expiry minutes" },
  { id: "redis", label: "Redis", hint: "REDIS_URL connection string" },
  { id: "debug", label: "Debug mode", hint: "DEBUG=True, reload enabled" },
  {
    id: "alembic",
    label: "Alembic note",
    hint: "reminder to set sqlalchemy.url",
  },
];

export const DEFAULT_SELECTIONS = {
  database: "postgres",
  format: "env", // 'env' | 'config'
  pool: false,
  cors: false,
  jwt: false,
  redis: false,
  debug: false,
  alembic: false,
};

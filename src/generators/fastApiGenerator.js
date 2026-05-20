const DB_URLS = {
  postgres: 'postgresql+{driver}://user:password@localhost:5432/mydb',
  mysql:    'mysql+pymysql://user:password@localhost:3306/mydb',
  sqlite:   'sqlite:///./mydb.db',
  mongodb:  'mongodb://user:password@localhost:27017/mydb',
}

function buildEnv(s) {
  const lines = []
  const gap = () => lines.push('')

  lines.push('# Database')
  lines.push(`DATABASE_URL=${DB_URLS[s.database]}`)

  if (s.pool && s.database !== 'mongodb') {
    gap()
    lines.push('# Connection pool')
    lines.push('DB_POOL_SIZE=5')
    lines.push('DB_MAX_OVERFLOW=10')
    lines.push('DB_POOL_TIMEOUT=30')
  }

  gap()
  lines.push('# App')
  lines.push('APP_NAME=myapp')
  lines.push('APP_VERSION=0.1.0')
  lines.push('SECRET_KEY=your_secret_key_here')

  if (s.cors) {
    gap()
    lines.push('# CORS')
    lines.push('CORS_ORIGINS=http://localhost:3000,http://localhost:5173')
  }

  if (s.jwt) {
    gap()
    lines.push('# JWT')
    lines.push('JWT_SECRET_KEY=your_jwt_secret_here')
    lines.push('JWT_ALGORITHM=HS256')
    lines.push('JWT_EXPIRY_MINUTES=30')
  }

  if (s.redis) {
    gap()
    lines.push('# Redis')
    lines.push('REDIS_URL=redis://localhost:6379/0')
  }

  if (s.debug) {
    gap()
    lines.push('# Dev')
    lines.push('DEBUG=True')
    lines.push('RELOAD=True')
  }

  if (s.alembic) {
    gap()
    lines.push('# Alembic — set sqlalchemy.url in alembic.ini to DATABASE_URL above')
  }

  return lines.join('\n')
}

function buildConfig(s) {
  const lines = []

  lines.push('from pydantic_settings import BaseSettings')
  lines.push('')
  lines.push('')
  lines.push('class Settings(BaseSettings):')
  lines.push(`    database_url: str = "${DB_URLS[s.database]}"`)

  if (s.pool && s.database !== 'mongodb') {
    lines.push('    db_pool_size: int = 5')
    lines.push('    db_max_overflow: int = 10')
    lines.push('    db_pool_timeout: int = 30')
  }

  lines.push('    app_name: str = "myapp"')
  lines.push('    secret_key: str = "your_secret_key_here"')

  if (s.cors)  lines.push('    cors_origins: list[str] = ["http://localhost:3000"]')
  if (s.jwt) {
    lines.push('    jwt_secret_key: str = "your_jwt_secret_here"')
    lines.push('    jwt_algorithm: str = "HS256"')
    lines.push('    jwt_expiry_minutes: int = 30')
  }
  if (s.redis) lines.push('    redis_url: str = "redis://localhost:6379/0"')
  if (s.debug) lines.push('    debug: bool = False')

  lines.push('')
  lines.push('    class Config:')
  lines.push('        env_file = ".env"')
  lines.push('')
  lines.push('')
  lines.push('def get_settings() -> Settings:')
  lines.push('    return Settings()')

  return lines.join('\n')
}

export function generateFastapi(selections) {
  return {
    env:    buildEnv(selections),
    config: buildConfig(selections),
  }
}
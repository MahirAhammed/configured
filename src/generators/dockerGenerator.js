function buildCompose(s) {
  const lines = [];
  const push = (l) => lines.push(l);
  const gap = () => lines.push("");

  const ports = {
    spring: "8080:8080",
    fastapi: "8000:8000",
    django: "8000:8000",
    express: "3000:3000",
  };

  const dbServiceName = {
    postgres: "postgres",
    mysql: "mysql",
    mongodb: "mongo",
  };

  push("services:");
  gap();

  push(`  ${s.appName}:`);
  push("    build: .");
  push(`    restart: ${s.restart}`);
  push("    ports:");
  push(`      - "${ports[s.app]}"`);

  if (s.envFile) {
    push("    env_file:");
    push("      - .env");
  }

  const dependencies = [];
  if (s.database !== "none") dependencies.push(dbServiceName[s.database]);
  if (s.redis) dependencies.push("redis");

  if (dependencies.length > 0) {
    push("    depends_on:");
    dependencies.forEach((dep) => push(`      - ${dep}`));
  }

  if (s.healthcheck) {
    const port = s.app === "express" ? "3000" : "8000";
    const healthPort = s.app === "spring" ? "8080" : port;
    push("    healthcheck:");
    push(
      `      test: ["CMD", "curl", "-f", "http://localhost:${healthPort}/health"]`,
    );
    push("      interval: 30s");
    push("      timeout: 10s");
    push("      retries: 3");
    push("      start_period: 15s");
  }

  if (s.network) {
    push("    networks:");
    push("      - app-network");
  }

  if (s.database === "postgres") {
    gap();
    push("  postgres:");
    push("    image: postgres:16-alpine");
    push(`    restart: ${s.restart}`);
    push("    environment:");
    push("      POSTGRES_DB: mydb");
    push("      POSTGRES_USER: your_username");
    push("      POSTGRES_PASSWORD: your_password");
    push("    ports:");
    push('      - "5432:5432"');
    if (s.volumes) {
      push("    volumes:");
      push("      - postgres-data:/var/lib/postgresql/data");
    }
    if (s.network) {
      push("    networks:");
      push("      - app-network");
    }
  }

  if (s.database === "mysql") {
    gap();
    push("  mysql:");
    push("    image: mysql:8-oracle");
    push(`    restart: ${s.restart}`);
    push("    environment:");
    push("      MYSQL_DATABASE: mydb");
    push("      MYSQL_USER: your_username");
    push("      MYSQL_PASSWORD: your_password");
    push("      MYSQL_ROOT_PASSWORD: your_root_password");
    push("    ports:");
    push('      - "3306:3306"');
    if (s.volumes) {
      push("    volumes:");
      push("      - mysql-data:/var/lib/mysql");
    }
    if (s.network) {
      push("    networks:");
      push("      - app-network");
    }
  }

  if (s.database === "mongodb") {
    gap();
    push("  mongo:");
    push("    image: mongo:7");
    push(`    restart: ${s.restart}`);
    push("    environment:");
    push("      MONGO_INITDB_DATABASE: mydb");
    push("      MONGO_INITDB_ROOT_USERNAME: your_username");
    push("      MONGO_INITDB_ROOT_PASSWORD: your_password");
    push("    ports:");
    push('      - "27017:27017"');
    if (s.volumes) {
      push("    volumes:");
      push("      - mongo-data:/data/db");
    }
    if (s.network) {
      push("    networks:");
      push("      - app-network");
    }
  }

  if (s.redis) {
    gap();
    push("  redis:");
    push("    image: redis:7-alpine");
    push(`    restart: ${s.restart}`);
    push("    ports:");
    push('      - "6379:6379"');
    if (s.volumes) {
      push("    volumes:");
      push("      - redis-data:/data");
    }
    if (s.network) {
      push("    networks:");
      push("      - app-network");
    }
  }

  if (s.volumes && (s.database !== "none" || s.redis)) {
    gap();
    push("volumes:");
    if (s.database === "postgres") push("  postgres-data:");
    if (s.database === "mysql") push("  mysql-data:");
    if (s.database === "mongodb") push("  mongo-data:");
    if (s.redis) push("  redis-data:");
  }

  if (s.network) {
    gap();
    push("networks:");
    push("  app-network:");
    push("    driver: bridge");
  }

  return lines.join("\n");
}

function buildDockerfile(s) {
  const name = s.appName;

  if (s.app === "spring")
    return [
      "FROM eclipse-temurin:21-jdk-alpine AS build",
      "WORKDIR /app",
      "COPY .mvn/ .mvn",
      "COPY mvnw pom.xml ./",
      "RUN ./mvnw dependency:go-offline",
      "COPY src ./src",
      "RUN ./mvnw package -DskipTests",
      "",
      "FROM eclipse-temurin:21-jre-alpine",
      "WORKDIR /app",
      "COPY --from=build /app/target/*.jar app.jar",
      "EXPOSE 8080",
      'ENTRYPOINT ["java", "-jar", "app.jar"]',
    ].join("\n");

  if (s.app === "fastapi")
    return [
      "FROM python:3.12-slim",
      "WORKDIR /app",
      "COPY requirements.txt .",
      "RUN pip install --no-cache-dir -r requirements.txt",
      "COPY . .",
      "EXPOSE 8000",
      `CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
    ].join("\n");

  if (s.app === "django")
    return [
      "FROM python:3.12-slim",
      "WORKDIR /app",
      "COPY requirements.txt .",
      "RUN pip install --no-cache-dir -r requirements.txt",
      "COPY . .",
      "EXPOSE 8000",
      "RUN python manage.py collectstatic --noinput",
      `CMD ["gunicorn", "${name}.wsgi:application", "--bind", "0.0.0.0:8000"]`,
    ].join("\n");

  if (s.app === "express")
    return [
      "FROM node:20-alpine",
      "WORKDIR /app",
      "COPY package*.json ./",
      "RUN npm ci --only=production",
      "COPY . .",
      "EXPOSE 3000",
      'CMD ["node", "src/index.js"]',
    ].join("\n");
}

function buildDockerignore(s) {
  const common = [".git", ".gitignore", ".env", "*.md", "README*"];

  const specificStack = {
    spring: [
      "target/",
      "*.class",
      "*.jar",
      "*.war",
      ".mvn/wrapper/maven-wrapper.jar",
    ],
    fastapi: [
      "__pycache__/",
      "*.pyc",
      ".venv/",
      "venv/",
      "*.egg-info/",
      ".pytest_cache/",
    ],
    django: [
      "__pycache__/",
      "*.pyc",
      ".venv/",
      "venv/",
      "*.egg-info/",
      ".pytest_cache/",
      "staticfiles/",
    ],
    express: ["node_modules/", "dist/", "coverage/", "*.log", "npm-debug.log*"],
  };

  return [...common, ...(specificStack[s.app] ?? [])].join("\n");
}

export function generateDocker(selections) {
  return {
    compose: buildCompose(selections),
    dockerfile: selections.dockerfile ? buildDockerfile(selections) : null,
    dockerignore: selections.dockerignore
      ? buildDockerignore(selections)
      : null,
  };
}
